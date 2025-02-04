import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HttpGet, HttpGetFile } from "@/requests.ts";
import Navbar from "../../Components/UI/Navbar/Navbar";
import classes from "./Profile.module.css";
import Button from "../../Components/Button/Button";
import ModalWindow from "../../Components/UI/ModalWindow/ModalWindow";
import { PageOwnerContext } from "../../Contexts/PageOwnerContext";
import UserInfo from "@/Components/UserInfo/UserInfo.tsx";
import PhotoInput from "@/Components/PhotoInput/PhotoInput.tsx";
import SettingsFrom from "@/Components/Forms/SettingsForm/SettingsFrom.tsx";
import { useFetch } from "@/Hooks/useFetch.tsx";
import Link from "@/Components/Link/Link.tsx";
import ChangePasswordForm from "@/Components/Forms/ChangePasswordForm/ChangePasswordForm.tsx";

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
    role,
  } = useContext(PageOwnerContext);
  const logoClick = () => {
    navigate("/users/" + localStorage.getItem("id"));
    navigate(0);
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const [isChanging, setIsChanging] = useState(false);
  const [passwordChangeActive, setPasswordChangeActive] = useState(false);
  const [answer, setAnswer] = useState("");
  const [getInfo, loading, error] = useFetch(async () => {
    try {
      const res = await HttpGet(`/users/${id}`, {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      });

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

      const photoResponse = await HttpGetFile(`/users/${id}/photo`, {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      });

      const photoBlob = await photoResponse.blob();
      setPhoto(URL.createObjectURL(photoBlob));
    } catch (err) {
      throw new Error("Failed to fetch user info: " + err.message);
    }
  });

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className={classes.wrap}>
      <ModalWindow
        setAnswer={setAnswer}
        active={isChanging}
        setActive={setIsChanging}
      >
        <SettingsFrom />
      </ModalWindow>
      <ModalWindow
        setAnswer={setAnswer}
        active={passwordChangeActive}
        setActive={setPasswordChangeActive}
      >
        <ChangePasswordForm />
      </ModalWindow>
      <div className={classes.profile}>
        <div className={classes.navbar}>
          <Navbar onLogoFunc={logoClick} />
        </div>

        <div className={classes.mainBlock}>
          {error !== undefined && <div>{error}</div>}
          {loading && <div className={classes.loader}></div>}
          {!loading && !error && <UserInfo />}
          {!loading && !error && <PhotoInput />}
          {!loading && !error && isPageOwner && (
            <div className={classes.editButton}>
              <Button
                onClick={() => setIsChanging(true)}
                disabled={false}
                color={{ r: 149, g: 237, b: 219 }}
              >
                Edit profile
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className={classes.statsBlock}>
        {isPageOwner && (
          <div className={classes.manageBlock}>
            <div className={classes.links}>
              {role < 2 ? (
                <Link>Wanna be writer or psychologist?</Link>
              ) : (
                <Link href="http://localhost:3000/articles/create_article">
                  Create an article
                </Link>
              )}
              <Link onClick={() => setPasswordChangeActive(true)}>
                Change password
              </Link>
            </div>

            <div className={classes.logout}>
              <Button
                color={{
                  r: 246,
                  g: 130,
                  b: 130,
                }}
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
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Profile;
