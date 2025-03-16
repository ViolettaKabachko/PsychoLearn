import React, { FC } from "react";
import classes from "./Navbar.module.css";
import logo from "../../../Images/logo.svg";

interface NavbarProps {
  onLogoFunc: () => void;
}

const Navbar: FC<NavbarProps> = ({ ...props }) => {
  console.log("Ja renderus");
  return (
    <div className={classes.navbar}>
      <div className={classes.logo}>
        <a href="/">
          <img alt="pct" src={logo} />
        </a>
      </div>

      <div className={classes.inner_link}>
        <a href="/course">Essential psychology course</a>
      </div>

      <div className={classes.inner_link}>
        <a href="/">Find your specialist</a>
      </div>

      <div className={classes.inner_link}>
        <a href="/articles">More psycho articles</a>
      </div>

      <div onClick={() => props.onLogoFunc()} className={classes.log_in_logo}>
        <div></div>
      </div>
    </div>
  );
};

export default React.memo(Navbar);
