import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HttpGet } from "../../requests";
import Navbar from "../../Components/UI/Navbar/Navbar";
import classes from "./Profile.module.css";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input.tsx";
import ModalWindow from "../../Components/UI/ModalWindow/ModalWindow";
import PhotoInput from "../../Components/PhotoInput/PhotoInput";
import UserInfo from "../../Components/UserInfo/UserInfo";
import { PageOwnerContext } from "../../Contexts/PageOwnerContext";

const Profile = () => {
  const { isPageOwner, setIsPageOwner } = useContext(PageOwnerContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isChanging, setIsChanging] = useState(false);

  return (
    <div className={classes.wrap}>
      <ModalWindow active={isChanging} setActive={setIsChanging}>
        <Input placeholder="Name"></Input>
        <Input placeholder="Surname"></Input>
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
