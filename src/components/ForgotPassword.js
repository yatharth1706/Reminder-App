import { Auth } from "aws-amplify";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input, Label } from "reactstrap";
import Logo from "../images/Hash.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setIsLoading(true);
      const results = await Auth.forgotPassword(email);
      console.log(results);
      setIsLoading(false);

      window.location.href = "/confirm";
      toast(`Email is sent on your registered email address. Please check`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setIsLoading(false);
      toast(`Error: ${err}`, {
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

  const validateForgotPassword = () => {
    return email.trim().length > 0;
  };

  return (
    <div className="bg-white drop-shadow-2xl rounded-md w-2/6 p-8 mx-auto mt-20">
      <div className="flex space-x-4 items-start justify-center mb-2">
        <img className="w-6" src={Logo} alt="HashNotify Logo" />
        <h1 className="text-xl">HashNotify</h1>
      </div>
      <h5 className="mb-3 text-center">ForgotPassword</h5>
      <div className="mb-3">
        <Label>Email</Label>
        <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="text-center">
        <Button
          color="primary"
          className="w-full mt-3 mb-2"
          onClick={handleForgotPassword}
          disabled={!validateForgotPassword() || isLoading}
        >
          {isLoading ? "Processing..." : "Forgot Password"}
        </Button>
      </div>
    </div>
  );
}

export default ForgotPassword;
