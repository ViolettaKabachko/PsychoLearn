import React, { FC, PropsWithChildren } from "react";
import classes from "./ModalWindow.module.css";

interface ModalWindowProps {
  setActive: (any) => void;
  active: boolean;
  setAnswer: (any) => void;
}

const ModalWindow: FC<PropsWithChildren<ModalWindowProps>> = ({
  children,
  active,
  setActive,
  setAnswer,
}) => {
  return (
    <div
      className={active ? classes.modal + ` ` + classes.active : classes.modal}
    >
      <div className={classes.modal_content}>
        <div
          onClick={() => {
            setActive(false);
            setAnswer("");
          }}
          className={classes.backCross}
        ></div>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
