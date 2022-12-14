import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, Input } from "reactstrap";
import { DataStore } from "@aws-amplify/datastore";
import { Reminders } from "../../models/index";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { toast } from "react-toastify";

function CreateReminderModal({ isOpen, toggle, refresh }) {
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
    }
  }, [isOpen]);

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

  const handleCreate = async () => {
    try {
      setIsSaving(true);
      let userId = getUserId();
      console.log(userId);
      await DataStore.save(
        new Reminders({
          name: modalData?.Name,
          description: modalData?.Description,
          recipients: modalData?.Recipient,
          message: modalData?.CustomMessage,
          scheduledOn: modalData?.ScheduledOn,
          status: "Pending",
          userId: userId,
        })
      );
      setIsSaving(false);
      toast(`Reminder created successfully`, {
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
      toast(`Some error occured while creating the reminder: ${e}`, {
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
        <h5 className="font-medium">Create Reminder</h5>
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

            {/* <Input
              type="textarea"
              value={}
              onChange={(e) => handleChange("CustomMessage", e.target.value)}
            /> */}
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
        <Button color="primary" onClick={handleCreate}>
          {isSaving ? "Saving..." : "Save"}
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
}

export default CreateReminderModal;
