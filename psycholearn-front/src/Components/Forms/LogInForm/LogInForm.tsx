import React, { FC, useState } from "react";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import { validateEmail } from "@/validation.ts";
import { useFetch } from "@/Hooks/useFetch.tsx";
import { HttpPost } from "@/requests.ts";
import classes from "./LogInForm.module.css";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LogInForm: FC = () => {
  const navigate = useNavigate();
  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  let notify;

  const [fetching, loading, error] = useFetch(async () => {
    let res = await HttpPost("/auth/login", {
      email: logInEmail,
      password: logInPassword,
    });
    if (Object.hasOwn(res, "err")) notify = () => toast.error(res.err);
    else {
      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("id", res.id);
      navigate("/users/" + res.id);
      notify = () => toast.success(res.msg);
    }
    console.log(res);
  });

  return (
    <>
      <div className={classes.signUpTitle}>Log in</div>
      <Input
        placeholder="Email"
        value={logInEmail}
        onChange={(e) => setLogInEmail(e.target.value)}
      ></Input>
      <Input
        type="password"
        placeholder="Password"
        value={logInPassword}
        onChange={(e) => setLogInPassword(e.target.value)}
      ></Input>
      <Button
        disabled={!(validateEmail(logInEmail) && logInPassword.length > 1)}
        color={{ r: 149, g: 237, b: 219 }}
        onClick={async () => {
          await fetching();
          notify();
        }}
      >
        Sign Up
      </Button>
      <Toaster position="bottom-center" />
    </>
  );
};

export default LogInForm;
