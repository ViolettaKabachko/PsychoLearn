import React, { FC, useContext } from "react";
import classes from "./UserInfo.module.css";
import { PageOwnerContext } from "../../Contexts/PageOwnerContext";

const UserInfo: FC = () => {
  const { name, setName } = useContext(PageOwnerContext);
  const { surname, setSurname } = useContext(PageOwnerContext);
  const { email, setEmail } = useContext(PageOwnerContext);
  const { role, setRole } = useContext(PageOwnerContext);
  const { about, setAbout } = useContext(PageOwnerContext);
  const roles = {
    1: "Reader",
    2: "Psychologist",
    3: "Admin",
  };
  // const [fetchUser, loadingUser, errorUser] = useFetch(() => {
  //   HttpGet("/users/" + id, {
  //     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //   }).then((res) => {
  //     console.log(res);
  //     if (res.err === undefined) {
  //       setName(res.username);
  //       setSurname(res.surname);
  //       setEmail(res.email);
  //       setRole(res.userrole);
  //       setAbout(res.about);
  //       setIsPageOwner(res.is_page_owner);
  //     }
  //   });
  // });
  //
  // useEffect(() => {
  //   fetchUser().then((r) => console.log(r));
  // }, []);

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
