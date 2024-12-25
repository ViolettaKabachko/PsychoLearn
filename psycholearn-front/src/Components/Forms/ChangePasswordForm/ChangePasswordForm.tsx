import React, { useState } from "react";
import Input from "@/Components/Input/Input.tsx";
import {
  hasCapitalLetters,
  hasDigits,
  hasEnoughLength,
  hasLowerLetter,
  passwordAreTheSame,
} from "@/validation.ts";
import Button from "@/Components/Button/Button.tsx";
import classes from "@/Components/Forms/SignUpForm/SignUpFrom.module.css";
import ValidationLine from "@/Components/ValidationLine/ValidationLine.tsx";
import { useFetch } from "@/Hooks/useFetch.tsx";
import { HttpPost } from "@/requests.ts";
import { useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const ChangePasswordForm = () => {
  const { id } = useParams();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");
  const [firstPasswordEnter, setFirstPasswordEnter] = useState(false);
  let notify: () => string = () => "";
  const [changePasswordFetch, loading, error] = useFetch(async () => {
    let res = await HttpPost(
      "/users/" + id + "/change_password",
      {
        id: id,
        currentPassword: currentPassword,
        newPassword: newPassword,
      },
      {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    );
    console.log(res);
    if (res.msg !== undefined) {
      notify = () => toast.success(res.msg);
      setCurrentPassword("");
      setNewPassword("");
      setRepeatedNewPassword("");
    } else notify = () => toast.error(res.err);
  });

  return (
    <>
      <Input
        placeholder="Current password"
        type="password"
        value={currentPassword}
        onChange={(e) => {
          setCurrentPassword(e.target.value);
          setFirstPasswordEnter(true);
        }}
      />
      <Input
        placeholder="New password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        placeholder="Repeat new password"
        type="password"
        value={repeatedNewPassword}
        onChange={(e) => setRepeatedNewPassword(e.target.value)}
      />

      {firstPasswordEnter &&
        (newPassword.length !== 0 || repeatedNewPassword.length !== 0) && (
          <div className={classes.validations}>
            <ValidationLine
              text={newPassword}
              func={(text: string) => hasEnoughLength(6, text)}
            >
              Length has to be more than 6
            </ValidationLine>
            <ValidationLine
              text={newPassword}
              func={(text: string) => hasDigits(text)}
            >
              Has to be at least 1 digit
            </ValidationLine>
            <ValidationLine
              text={newPassword}
              func={(text: string) => hasLowerLetter(text)}
            >
              Has to be at least 1 low letter
            </ValidationLine>
            <ValidationLine
              text={newPassword}
              func={(text: string) => hasCapitalLetters(text)}
            >
              Has to be at least 1 capital letter
            </ValidationLine>
            {(newPassword.length !== 0 || repeatedNewPassword.length !== 0) && (
              <ValidationLine
                text={repeatedNewPassword}
                func={(repeatedPassword) =>
                  passwordAreTheSame(newPassword, repeatedPassword)
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
            hasCapitalLetters(newPassword),
            hasDigits(newPassword),
            hasEnoughLength(6, newPassword),
            hasLowerLetter(newPassword),
            passwordAreTheSame(newPassword, repeatedNewPassword),
            currentPassword.length > 0,
          ].reduce((acc, cur) => {
            return acc + +cur;
          }, 0) !== 6
        }
        color={{ r: 149, g: 237, b: 219 }}
        onClick={async () => {
          await changePasswordFetch();
          notify();
        }}
      >
        Change password
      </Button>
      <Toaster position="top-right" />
    </>
  );
};

export default ChangePasswordForm;
