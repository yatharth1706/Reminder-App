import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import Filters from "./Filters";
import Pagination from "./Pagination";
import { DataStore } from "@aws-amplify/datastore";
import { Reminders } from "../models/index";
import EditIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import DeleteIcon from "@heroicons/react/24/outline/TrashIcon";
import Moment from "moment";
import UpdateReminderModal from "./modals/UpdateReminderModal";
import DeleteReminderModal from "./modals/DeleteReminderModal";
import { useRecoilState } from "recoil";
import { sideNavAtom } from "../atoms/Sidenav";
import Calender from "./Calender";

function Main() {
  const [sideNav, setSideNav] = useRecoilState(sideNavAtom);
  const [reminders, setReminders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [rowData, setRowData] = useState({});
  const [updateReminderModal, setUpdateReminderModal] = useState(false);
  const [deleteReminderModal, setDeleteReminderModal] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [currRecords, setCurrRecords] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [currReminders, setCurrReminders] = useState([]);
  const [search, setSearch] = useState("");
  const [scheduledOn, setScheduledOn] = useState("");
  const [allReminders, setAllReminders] = useState([]);

  useEffect(() => {
    getReminders();
  }, []);

  useEffect(() => {
    getReminders();
  }, [sideNav]);

  useEffect(() => {
    console.log(reminders);
  }, [reminders]);

  useEffect(() => {
    paginate();
  }, [currPage, reminders]);

  useEffect(() => {
    filterRecords(search, scheduledOn);
  }, [search, scheduledOn]);

  const filterRecords = (search, scheduledOn) => {
    let existingRecords = [...allReminders];
    if (search) {
      existingRecords = existingRecords.filter((rem) =>
        rem.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    console.log(scheduledOn);
    if (scheduledOn) {
      existingRecords = existingRecords.filter((rem) => {
        return rem.scheduledOn.includes(scheduledOn);
      });
    }

    setReminders([...existingRecords]);
  };

  const getUserId = () => {
    let userConfig = JSON.parse(localStorage.getItem("CognitoUser"));
    let userId = userConfig["username"];
    return userId;
  };

  const getReminders = async () => {
    try {
      let userId = getUserId();
      console.log(userId);
      setIsFetching(true);
      let models = [];
      console.log(sideNav);
      if (sideNav === "Pending") {
        models = await DataStore.query(
          Reminders,
          (rem) => rem.status("eq", "Pending") && rem.userId("eq", userId)
        );
      } else if (sideNav === "Completed") {
        models = await DataStore.query(
          Reminders,
          (rem) => rem.status("eq", "Completed") && rem.userId("eq", userId)
        );
      } else if (sideNav === "All") {
        models = await DataStore.query(Reminders, (rem) => rem.userId("eq", userId));
      } else {
        models = await DataStore.query(Reminders, (rem) => rem.userId("eq", userId));
      }

      console.log(models, typeof models);
      setReminders([...models]);
      setAllReminders([...models]);
      setTotalRecords(models.length);
      setIsFetching(false);
    } catch (err) {
      alert(err);
    }
  };

  const paginate = () => {
    let noOfRecordsPerPage = 2;
    let totalPages = Math.ceil(reminders.length / noOfRecordsPerPage);
    setLastPage(totalPages);

    let finalRecords = reminders.slice(
      (currPage - 1) * noOfRecordsPerPage,
      (currPage - 1) * noOfRecordsPerPage + noOfRecordsPerPage
    );

    console.log(finalRecords);
    console.log(
      (currPage - 1) * noOfRecordsPerPage,
      (currPage - 1) * noOfRecordsPerPage + noOfRecordsPerPage
    );
    console.log(totalPages, currPage, noOfRecordsPerPage, reminders);

    setCurrReminders([...finalRecords]);
    setCurrRecords((currPage - 1) * noOfRecordsPerPage + noOfRecordsPerPage);
  };

  const incrementPage = (page) => {
    if (page + 1 <= lastPage) {
      setCurrPage(page + 1);
    }
  };
  const decrementPage = (page) => {
    if (page - 1 >= 1) {
      setCurrPage(page - 1);
    }
  };
  const goToFirstPage = () => {
    setCurrPage(1);
  };
  const goToLastPage = () => {
    setCurrPage(lastPage);
  };

  const getBackgroundColor = (status) => {
    if (status === "Pending") {
      return "#3B82F6";
    } else {
      return "#39F835";
    }
  };

  const setFilters = (searchVal, scheduledOnVal) => {
    setSearch(searchVal);
    setScheduledOn(scheduledOnVal);
  };

  return (
    <div className="bg-white drop-shadow-2xl rounded-md w-5/6 p-8">
      {/* Filters */}
      {sideNav !== "Calender" && (
        <>
          <Filters handleFilters={setFilters} refresh={getReminders} sideNav={sideNav} />
          <Table bordered className="mt-6">
            <thead>
              <tr className="text-gray-700 font-normal">
                <th style={{ width: "40%" }}>Name</th>
                <th style={{ width: "30%" }}>Scheduled On</th>
                <th style={{ width: "20%" }}>Status</th>
                <th style={{ width: "10%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currReminders.map((rem) => (
                <tr className="text-gray-700">
                  <td title={rem?.name}>
                    {rem?.name}
                    <br />
                    <span className="text-xs text-gray-500">{rem?.description}</span>
                  </td>
                  <td>{Moment(rem?.scheduledOn).format("MMMM Do YYYY, h:mm")}</td>
                  <td className="flex items-center">
                    <div
                      className="w-3 h-3 mr-2 rounded-full inline-block"
                      style={{ backgroundColor: getBackgroundColor(rem?.status) }}
                    ></div>
                    <span className="">{rem?.status}</span>
                  </td>
                  <td>
                    <EditIcon
                      className="w-5 inline mr-2 cursor-pointer"
                      title="Edit"
                      onClick={() => {
                        setRowData(rem);
                        setUpdateReminderModal(true);
                      }}
                    />
                    <DeleteIcon
                      className="w-5 inline cursor-pointer"
                      title="Delete"
                      onClick={() => {
                        setRowData(rem);
                        setDeleteReminderModal(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {isFetching && reminders.length == 0 && (
            <div className="text-center text-sm text-gray-600">
              <span>Loading...</span>
            </div>
          )}
          {!isFetching && reminders.length == 0 && (
            <div className="text-center text-sm text-gray-600">
              <span>No reminders found</span>
            </div>
          )}
          <Pagination
            incrementPage={incrementPage}
            decrementPage={decrementPage}
            firstPage={goToFirstPage}
            lastPage={goToLastPage}
            currPage={currPage}
            currRecords={currRecords}
            totalRecords={totalRecords}
          />
          <UpdateReminderModal
            isOpen={updateReminderModal}
            toggle={() => setUpdateReminderModal(!updateReminderModal)}
            refresh={getReminders}
            rowData={rowData}
          />
          <DeleteReminderModal
            isOpen={deleteReminderModal}
            toggle={() => setDeleteReminderModal(!deleteReminderModal)}
            refresh={getReminders}
            rowData={rowData}
          />
        </>
      )}

      {sideNav === "Calender" && <Calender />}
    </div>
  );
}

export default Main;
