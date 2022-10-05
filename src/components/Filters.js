import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import reminderImage from "../images/icons/reminder.png";
import CreateReminderModal from "./modals/CreateReminderModal";

function Filters({ refresh }) {
  const [createModalState, setCreateModalState] = useState(false);

  return (
    <div className="flex justify-between">
      <div className="flex space-x-6">
        <Input type="search" placeholder="Search any reminder ..." style={{ width: "200px" }} />
        <Input type="date" style={{ width: "200px" }} />
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
