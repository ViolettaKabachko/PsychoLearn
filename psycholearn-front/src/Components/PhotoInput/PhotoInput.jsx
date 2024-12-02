import React, { useEffect, useState } from "react";
import classes from "./PhotoInput.module.css";
import phot from "../../Images/default.svg";
import { useFetch } from "../../Hooks/useFetch";
import { HttpGetFile, HttpPostFile } from "../../requests";
import { useParams } from "react-router-dom";

const PhotoInput = ({ ...props }) => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(phot);
  const [newPhoto, setNewPhoto] = useState();
  const [photoChanged, setPhotoChanged] = useState(false);
  const [updatePhoto, loading, error] = useFetch(async () => {
    let data = new FormData();
    let file = await fetch(newPhoto)
      .then((r) => r.blob())
      .then(
        (blobFile) =>
          new File([blobFile], `user_${id}.jpeg`, { type: "image/jpeg" }),
      );
    data.append(`users_photo`, file, `user_${id}.jpeg`);
    let res = await HttpPostFile(`/users/${id}/update_photo`, data, {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    });
    console.log(res);
    setPhoto(newPhoto);
    setPhotoChanged(false);
    setNewPhoto(undefined);
  });

  useEffect(() => {
    console.log(props.isPageOwner);
    HttpGetFile(`/users/${id}/photo`, {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    }).then((res) => {
      res.blob().then((r) => setPhoto(URL.createObjectURL(r)));
    });
  }, []);

  useEffect(() => {
    console.log(newPhoto);
  }, [newPhoto]);

  return (
    <div
      style={{
        "--photo-url": `url(${newPhoto === undefined ? photo : newPhoto})`,
      }}
      className={
        props.isPageOwner
          ? classes.profilePhoto + " " + classes.owned
          : classes.profilePhoto
      }
    >
      <input
        accept="image/jpeg"
        onChange={(e) => {
          if (e.target.files[0]) {
            console.log(e.target.files[0]);
            setNewPhoto(URL.createObjectURL(e.target.files[0]));
            setPhotoChanged(true);
          } else console.log("No file chosen");
          e.target.value = "";
        }}
        className={
          props.isPageOwner ? classes.fileInputOwner : classes.fileInput
        }
        type="file"
      ></input>
      {photoChanged && (
        <div className={classes.acceptLine}>
          <div style={{ color: "green" }}>
            <span
              onClick={async () => {
                await updatePhoto();
              }}
              className={classes.confirmBtn}
            >
              {"✔"}
            </span>
          </div>
          <div
            onClick={() => {
              setPhotoChanged(false);
              setNewPhoto(undefined);
            }}
            style={{ color: "red" }}
          >
            <span className={classes.confirmBtn}>{"✖"}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoInput;
