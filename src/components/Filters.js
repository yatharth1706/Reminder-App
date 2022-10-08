import React, { useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import reminderImage from "../images/icons/reminder.png";
import CreateReminderModal from "./modals/CreateReminderModal";

function Filters({ refresh, handleFilters, sideNav }) {
  const [createModalState, setCreateModalState] = useState(false);
  const [search, setSearch] = useState("");
  const [scheduledOn, setScheduledOn] = useState("");

  useEffect(() => {
    handleFilters(search, scheduledOn);
  }, [search, scheduledOn]);

  useEffect(() => {
    setSearch("");
    setScheduledOn("");
  }, [sideNav]);

  return (
    <div className="flex justify-between">
      <div className="flex space-x-6">
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search any reminder ..."
          style={{ width: "200px" }}
        />
        <Input
          type="date"
          value={scheduledOn}
          onChange={(e) => setScheduledOn(e.target.value)}
          style={{ width: "200px" }}
        />
      </div>
      <div>
        <Button color="primary" className="flex" onClick={() => setCreateModalState(true)}>
          Create Reminder
        </Button>

        <CreateReminderModal
          isOpen={createModalState}
          toggle={() => setCreateModalState(!createModalState)}
          refresh={refresh}
        />
      </div>
    </div>
  );
}

export default Filters;
