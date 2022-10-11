import { Auth } from "aws-amplify";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input, Label } from "reactstrap";
import Logo from "../images/Hash.png";

function ConfirmCode() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmCode = async () => {
    try {
      setIsLoading(true);
      const results = await Auth.forgotPasswordSubmit(email, code, password);
      console.log(results);
      setIsLoading(false);
      window.location.href = "/login";
      toast(`Successfully reset the password`, {
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

  const validateConfirmCode = () => {
    return email.trim().length > 0 && code.trim().length > 0 && password.trim().length > 0;
  };

  return (
    <div className="bg-white drop-shadow-2xl rounded-md w-2/6 p-8 mx-auto mt-20">
      <div className="flex space-x-4 items-start justify-center mb-2">
        <img className="w-6" src={Logo} alt="HashNotify Logo" />
        <h1 className="text-xl">HashNotify</h1>
      </div>
      <h5 className="mb-3 text-center">Reset Password</h5>
      <div className="mb-3">
        <Label>Code</Label>
        <Input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
      </div>
      <div className="mb-3">
        <Label>Email</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <Label>Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="text-center">
        <Button
          color="primary"
          className="w-full mt-3 mb-2"
          onClick={handleConfirmCode}
          disabled={!validateConfirmCode() || isLoading}
        >
          {isLoading ? "Resetting..." : "Reset"}
        </Button>
      </div>
    </div>
  );
}

export default ConfirmCode;
