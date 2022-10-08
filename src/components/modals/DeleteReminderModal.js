import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { DataStore } from "@aws-amplify/datastore";
import { Reminders } from "../../models/index";
import { toast } from "react-toastify";

function DeleteReminderModal({ isOpen, toggle, refresh, rowData }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const reminder = await DataStore.query(Reminders, rowData?.id);
      await DataStore.delete(reminder);
      setIsDeleting(false);
      toast(`Reminder deleted successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      toggle();
      refresh();
    } catch (e) {
      toast(`Some error occured while deleting the reminder: ${e}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
