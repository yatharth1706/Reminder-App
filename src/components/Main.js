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

function Main() {
  const [reminders, setReminders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [rowData, setRowData] = useState({});
  const [updateReminderModal, setUpdateReminderModal] = useState(false);
  const [deleteReminderModal, setDeleteReminderModal] = useState(false);

  useEffect(() => {
    getReminders();
  }, []);

  useEffect(() => {
    console.log(reminders);
  }, [reminders]);

  const getReminders = async () => {
    setIsFetching(true);
    const models = await DataStore.query(Reminders);
    console.log(models, typeof models);
    setReminders([...models]);
    setIsFetching(false);
  };

  const getBackgroundColor = (status) => {
    if (status === "Pending") {
      return "#3B82F6";
    } else {
      return "#39F835";
    }
  };

  return (
    <div className="bg-white drop-shadow-2xl rounded-md w-5/6 h-96 p-8">
      {/* Filters */}
      <Filters refresh={getReminders} />
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
          {reminders.map((rem) => (
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
      <Pagination currRecords={reminders.length} totalRecords={reminders.length} />
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
    </div>
  );
}

export default Main;
