import { Auth } from "aws-amplify";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input, Label } from "reactstrap";
import Logo from "../images/Hash.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const user = await Auth.signIn(email, password);
      setIsLoading(false);
      console.log(user);
      localStorage.setItem("CognitoUser", JSON.stringify(user));
      window.location.href = "/reminders";
      toast(`User signed in successfully`, {
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

  const validateLogin = () => {
    return email.trim().length > 0 && password.trim().length > 0;
  };

  return (
    <div className="bg-white drop-shadow-2xl rounded-md w-2/6 p-8 mx-auto mt-20">
      <div className="flex space-x-4 items-start justify-center mb-2">
        <img className="w-6" src={Logo} alt="HashNotify Logo" />
        <h1 className="text-xl">HashNotify</h1>
      </div>
      <h5 className="mb-3 text-center">Login</h5>
      <div className="mb-3">
        <Label>Email</Label>
        <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <Label>Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="text-center">
        <Button
          color="primary"
          className="w-full mt-3 mb-2"
          onClick={handleLogin}
          disabled={!validateLogin() || isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        <Link className="decoration-white text-sm" to="/forgot-password">
          Forgot Password
        </Link>
      </div>
    </div>
  );
}

export default Login;
