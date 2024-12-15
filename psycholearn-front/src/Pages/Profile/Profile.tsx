import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HttpGet, HttpGetFile } from "@/requests.ts";
import Navbar from "../../Components/UI/Navbar/Navbar";
import classes from "./Profile.module.css";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input.tsx";
import ModalWindow from "../../Components/UI/ModalWindow/ModalWindow";
import { PageOwnerContext } from "../../Contexts/PageOwnerContext";
import UserInfo from "@/Components/UserInfo/UserInfo.tsx";
import PhotoInput from "@/Components/PhotoInput/PhotoInput.tsx";

const Profile = () => {
  const {
    isPageOwner,
    setIsPageOwner,
    setName,
    setSurname,
    setEmail,
    setRole,
    setAbout,
    setPhoto,
  } = useContext(PageOwnerContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isChanging, setIsChanging] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    HttpGet("/users/" + id, {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    })
      .then((res) => {
        console.log(res);
        if (res.err === undefined) {
          if (res.access_token !== undefined)
            localStorage.setItem("access_token", res.access_token);
          setName(res.username);
          setSurname(res.surname);
          setEmail(res.email);
          setRole(res.userrole);
          setAbout(res.about);
          setIsPageOwner(res.is_page_owner);
        } else {
          localStorage.clear();
          navigate("/start");
        }
      })
      .then((r) =>
        HttpGetFile(`/users/${id}/photo`, {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }).then((res) => {
          res.blob().then((r) => {
            console.log(isPageOwner);
            console.log(r);
            setPhoto(URL.createObjectURL(r));
          });
        }),
      );
  }, []);

  return (
    <div className={classes.wrap}>
      <ModalWindow
        setAnswer={setAnswer}
        active={isChanging}
        setActive={setIsChanging}
      >
        <Input value={""} onChange={() => {}} placeholder="Name"></Input>
        <Input value={""} onChange={() => {}} placeholder="Surname"></Input>
      </ModalWindow>
      <div className={classes.profile}>
        <div className={classes.navbar}>
          <Navbar
            onLogoFunc={() => {
              navigate("/users/" + localStorage.getItem("id"));
              navigate(0);
            }}
          />
        </div>

        <div className={classes.mainBlock}>
          <UserInfo />
          <PhotoInput />
          {isPageOwner && (
            <div className={classes.editButton}>
              <Button
                onClick={() => setIsChanging(true)}
                disabled={false}
                color={{ r: 149, g: 237, b: 219 }}
              >
                {"Edit profile"}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className={classes.statsBlock}>
        {isPageOwner && (
          <div
            onClick={() =>
              HttpGet(`/users/${id}/logout`, {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              }).then((r) => {
                if (r["err"] === undefined) {
                  localStorage.clear();
                  document.cookie =
                    "refresh_token" +
                    "=1;expires=Thu, 01 Jan 1970 00:00:00 GMT';";
                  navigate("/start");
                }
              })
            }
            className={classes.logout}
          ></div>
        )}
      </div>
    </div>
  );
};
export default Profile;
