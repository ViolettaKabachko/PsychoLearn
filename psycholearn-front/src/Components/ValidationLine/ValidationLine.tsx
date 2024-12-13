import React, { FC, PropsWithChildren } from "react";
import classes from "./ValidationLine.module.css";

interface ValidationLineProps {
  func: (text?: string) => boolean | string;
  text?: string;
}

const ValidationLine: FC<PropsWithChildren<ValidationLineProps>> = ({
  children,
  func,
  text,
}) => {
  let func_res = func(text);
  return (
    <div
      className={
        func_res
          ? classes.validation + " " + classes.success
          : classes.validation + " " + classes.failure
      }
    >
      {children}
    </div>
  );
};

export default ValidationLine;
