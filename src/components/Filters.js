import React from "react";
import { Button, Input } from "reactstrap";
import reminderImage from "../images/icons/reminder.png";

function Filters() {
  return (
    <div className="flex justify-between">
      <div className="flex space-x-6">
        <Input type="search" placeholder="Search any reminder ..." style={{ width: "200px" }} />
        <Input type="datetime-local" style={{ width: "200px" }} />
      </div>
      <div>
        <Button color="primary" className="flex">
          Create Reminder
        </Button>
      </div>
    </div>
  );
}

export default Filters;
