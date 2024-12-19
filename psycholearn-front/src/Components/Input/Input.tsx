import React, { FC } from "react";
import classes from "./Input.module.css";

interface InputProps {
  placeholder: string;
  value: string;
  type?: string;
  onChange: (any) => void;
}

const Input: FC<InputProps> = ({ ...props }) => {
  return <input className={classes.input} {...props}></input>;
};

export default Input;
