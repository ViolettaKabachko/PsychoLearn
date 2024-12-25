import React, { FC, useState } from "react";
import classes from "./SignUpFrom.module.css";
import Input from "../../Input/Input";
import ValidationLine from "../../ValidationLine/ValidationLine";
import {
  hasCapitalLetters,
  hasDigits,
  hasEnoughLength,
  hasLowerLetter,
  passwordAreTheSame,
  validateEmail,
} from "@/validation.ts";
import Button from "../../Button/Button";
import { useFetch } from "@/Hooks/useFetch.tsx";
import { HttpGet, HttpPost } from "@/requests.ts";
import bcrypt from "bcryptjs";
import { toast, Toaster } from "react-hot-toast";

const SignUpForm: FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [firstPasswordEnter, setFirstPasswordEnter] = useState(false);

  let notify: () => string | Promise<string>;

  const [registerFetch, loading1, error1] = useFetch(async () => {
    let salt = await HttpGet("/secure/get_salt");
    console.log(salt);
    let res = await HttpPost("/users", {
      name: name,
      surname: surname,
      email: email,
      password: await bcrypt.hash(password, salt.salt),
    });

    if (Object.hasOwn(await res, "msg")) {
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      setRepeatedPassword("");
      notify = async () => toast.success(res.msg);
    } else {
      setPassword("");
      setRepeatedPassword("");
      notify = async () => toast.error(res.err);
    }
  });

  return (
    <>
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></Input>
      <Input
        placeholder="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      ></Input>
      <Input
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      {email.length !== 0 && (
        <ValidationLine text={email} func={(text) => validateEmail(text)}>
          Correct email
        </ValidationLine>
      )}
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setFirstPasswordEnter(true);
        }}
      ></Input>
      <Input
        placeholder="Repeat password"
        type="password"
        value={repeatedPassword}
        onChange={(e) => setRepeatedPassword(e.target.value)}
      ></Input>

      {firstPasswordEnter &&
        (password.length !== 0 || repeatedPassword.length !== 0) && (
          <div className={classes.validations}>
            <ValidationLine
              text={password}
              func={(text: string) => hasEnoughLength(6, text)}
            >
              Length has to be more than 6
            </ValidationLine>
            <ValidationLine
              text={password}
              func={(text: string) => hasDigits(text)}
            >
              Has to be at least 1 digit
            </ValidationLine>
            <ValidationLine
              text={password}
              func={(text: string) => hasLowerLetter(text)}
            >
              Has to be at least 1 low letter
            </ValidationLine>
            <ValidationLine
              text={password}
              func={(text: string) => hasCapitalLetters(text)}
            >
              Has to be at least 1 capital letter
            </ValidationLine>
            {(password.length !== 0 || repeatedPassword.length !== 0) && (
              <ValidationLine
                text={repeatedPassword}
                func={(repeatedPassword) =>
                  passwordAreTheSame(password, repeatedPassword)
                }
              >
                Passwords have to match
              </ValidationLine>
            )}
          </div>
        )}

      <Button
        disabled={
          [
            hasCapitalLetters(password),
            hasDigits(password),
            hasEnoughLength(6, password),
            hasLowerLetter(password),
            passwordAreTheSame(password, repeatedPassword),
            validateEmail(email),
            name.length > 1,
            surname.length > 1,
          ].reduce((acc, cur) => {
            return acc + +cur;
          }, 0) !== 8
        }
        onClick={async () => {
          await registerFetch();
          notify();
        }}
        color={{ r: 170, g: 218, b: 209 }}
      >
        Sign Up
      </Button>
      <Toaster position="bottom-center" />
    </>
  );
};

export default SignUpForm;
