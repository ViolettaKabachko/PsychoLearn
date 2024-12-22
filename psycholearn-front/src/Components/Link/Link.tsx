import React, { FC, PropsWithChildren } from "react";
import classes from "./Link.module.css";

interface ILinkProps {
  href?: string;
  onClick?: () => void;
}

const Link: FC<PropsWithChildren<ILinkProps>> = ({
  children,
  href,
  onClick,
}) => {
  return (
    <div className={classes.link}>
      <a className={classes.anchor} href={href} onClick={onClick}>
        {children}
      </a>
    </div>
  );
};

export default Link;
