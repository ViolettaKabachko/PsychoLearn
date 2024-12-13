import React, { FC, PropsWithChildren } from "react";
import classes from "./Input.module.css";

interface InputProps {
  placeholder: string;
  value: string;
  type?: string;
  onChange: (any) => void;
}

const Input: FC<PropsWithChildren<InputProps>> = ({ children, ...props }) => {
  return (
    <input className={classes.input} {...props}>
      {children}
    </input>
  );
};

export default Input;
