import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, Input } from "reactstrap";
import { DataStore } from "@aws-amplify/datastore";
import { Reminders } from "../../models/index";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { toast } from "react-toastify";

function UpdateReminderModal({ isOpen, toggle, refresh, rowData }) {
  const [modalData, setModalData] = useState({
    Name: "",
    Description: "",
    Recipient: "",
    CustomMessage: "",
    ScheduledOn: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key, value) => {
    let data = { ...modalData };

    data[key] = value;

    setModalData({ ...data });
  };

  useEffect(() => {
    if (!isOpen) {
      resetStates();
    } else {
      setDefaultValues();
    }
  }, [isOpen]);

  const setDefaultValues = () => {
    setModalData({
      Name: rowData?.name,
      Description: rowData?.description,
      Recipient: rowData?.recipients,
      CustomMessage: rowData?.message,
      ScheduledOn: rowData?.scheduledOn,
    });
  };

  const resetStates = () => {
    setModalData({
      Name: "",
      Description: "",
      Recipient: "",
      CustomMessage: "",
      ScheduledOn: "",
    });
  };

  const getUserId = () => {
    let userConfig = JSON.parse(localStorage.getItem("CognitoUser"));
    let userId = userConfig["username"];
    return userId;
  };

  const handleUpdate = async () => {
    try {
      setIsSaving(true);
      const original = await DataStore.query(Reminders, rowData?.id);
      let userId = getUserId();
      console.log(userId);
      console.log(original);
      await DataStore.save(
        Reminders.copyOf(original, (existing) => {
          existing.name = modalData?.Name;
          existing.description = modalData?.Description;
          existing.recipients = modalData?.Recipient;
          existing.message = modalData?.CustomMessage;
          existing.scheduledOn = modalData?.ScheduledOn;
          existing.status = "Pending";
          existing.userId = userId;
        })
      );
      setIsSaving(false);
      toast(`Reminder updated successfully`, {
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
      toast(`Some error occured while updating the reminder: ${e}`, {
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
        <h5 className="font-medium">Update Reminder</h5>
      </ModalHeader>
      <ModalBody>
        <div className="p-2">
          <div className="mb-3">
            <Label>Name</Label>
            <Input
              type="text"
              value={modalData?.Name}
              onChange={(e) => handleChange("Name", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Label>Description</Label>
            <Input
              type="textarea"
              value={modalData?.Description}
              onChange={(e) => handleChange("Description", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Label>Recipient</Label>
            <Input
              type="email"
              value={modalData?.Recipient}
              onChange={(e) => handleChange("Recipient", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Label>Custom Message</Label>
            <div data-color-mode="light">
              <MDEditor
                value={modalData?.CustomMessage}
                onChange={(e) => {
                  handleChange("CustomMessage", e);
                }}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
              />
            </div>
          </div>
          <div className="mb-3">
            <Label>Scheduled On</Label>
            <Input
              type="datetime-local"
              value={modalData?.ScheduledOn}
              onChange={(e) => handleChange("ScheduledOn", e.target.value)}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleUpdate}>
          {isSaving ? "Updating..." : "Update"}
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
}

export default UpdateReminderModal;
