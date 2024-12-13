import React, { FC, PropsWithChildren } from "react";
import classes from "./ModalWindow.module.css";

interface ModalWindowProps {
  setActive: (any) => void;
  active: boolean;
}

const ModalWindow: FC<PropsWithChildren<ModalWindowProps>> = ({
  children,
  active,
  setActive,
}) => {
  return (
    <div
      className={active ? classes.modal + ` ` + classes.active : classes.modal}
    >
      <div className={classes.modal_content}>{children}</div>
    </div>
  );
};

export default ModalWindow;
