import React, { useEffect, useState } from "react";
import classes from "./UserInfo.module.css";
import { useFetch } from "../../Hooks/useFetch";
import { HttpGet } from "../../requests";
import { useNavigate, useParams } from "react-router-dom";

const UserInfo = ({ ...props }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurame] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(1);
  const roles = {
    1: "Reader",
    2: "Psychologist",
    3: "Admin",
  };
  const [about, setAbout] = useState("");
  const [fetchUser, loadingUser, errorUser] = useFetch(async () => {
    HttpGet("/users/" + id, {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    }).then((res) => {
      console.log(res);
      if (res.err === undefined) {
        setName(res.username);
        setSurame(res.surname);
        setEmail(res.email);
        setRole(res.userrole);
        setUid(res.uid);
        setAbout(res.about);
        props.setIsPageOwner(res.is_page_owner);
        if (res.access_token !== undefined)
          localStorage.setItem("access_token", res.access_token);
      } else {
        localStorage.clear();
        navigate("/start");
      }
    });
  });

  useEffect(() => {
    fetchUser().then((r) => console.log(r));
  }, []);

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
