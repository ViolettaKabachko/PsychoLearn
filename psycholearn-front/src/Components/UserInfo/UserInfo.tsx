import React, { FC, useContext } from "react";
import classes from "./UserInfo.module.css";
import { PageOwnerContext } from "../../Contexts/PageOwnerContext";

const UserInfo: FC = () => {
  const { name } = useContext(PageOwnerContext);
  const { surname } = useContext(PageOwnerContext);
  const { email } = useContext(PageOwnerContext);
  const { role } = useContext(PageOwnerContext);
  const { about } = useContext(PageOwnerContext);
  const roles = {
    1: "Reader",
    2: "Psychologist",
    3: "Admin",
  };

  return (
    <div className={classes.userInfo}>
      <div style={{ fontSize: "40px", fontWeight: "bold" }}>
        <div>{`${name} ${surname}`}</div>
      </div>

      <div style={{ fontSize: "32px", fontWeight: "bold" }}>{email}</div>

      <div style={{ fontSize: "32px" }}>
        <div style={{ fontSize: "32px", fontWeight: "bold" }}>
          {roles[role]}
        </div>
      </div>
      <div style={{ fontSize: "32px", fontWeight: "bold" }}>
        {`About: ${about}`}
      </div>
    </div>
  );
};

export default UserInfo;
