import React, { FC, PropsWithChildren } from "react";
import classes from "./Button.module.css";

interface ButtonProps {
  color: {
    r: number;
    g: number;
    b: number;
  };
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  color,
  disabled,
  children,
  onClick,
}) => {
  let colorObj = {};

  ["r", "g", "b"].forEach((x) => {
    colorObj[`--${x}-color`] = color[x];
  });
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={colorObj}
      className={classes.button}
    >
      {children}
    </button>
  );
};

export default Button;
