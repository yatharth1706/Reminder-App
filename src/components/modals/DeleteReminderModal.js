import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { DataStore } from "@aws-amplify/datastore";
import { Reminders } from "../../models/index";

function DeleteReminderModal({ isOpen, toggle, refresh, rowData }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const reminder = await DataStore.query(Reminders, rowData?.id);
    await DataStore.delete(reminder);
    setIsDeleting(false);
    toggle();
    refresh();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" className="font-nunito">
      <ModalHeader toggle={toggle}>
        <h5 className="font-medium">Delete Reminder</h5>
      </ModalHeader>
      <ModalBody>
        <div className="p-2">
          <p>Are you sure you want to delete the following reminder?</p>
          <li>{rowData?.name}</li>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleDelete}>
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
}

export default DeleteReminderModal;
