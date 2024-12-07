import React, { useContext, useEffect, useState } from "react";
import classes from "./PhotoInput.module.css";
import phot from "../../Images/default.svg";
import { useFetch } from "../../Hooks/useFetch";
import { HttpGetFile, HttpPostFile } from "../../requests";
import { useParams } from "react-router-dom";
import { PageOwnerContext } from "../../Contexts/PageOwnerContext";

const PhotoInput = ({ ...props }) => {
  const { id } = useParams();
  const { isPageOwner } = useContext(PageOwnerContext);
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
    setPhoto(newPhoto);
    setPhotoChanged(false);
    setNewPhoto(undefined);
  });

  useEffect(() => {
    HttpGetFile(`/users/${id}/photo`, {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    }).then((res) => {
      res.blob().then((r) => {
        console.log(isPageOwner);
        setPhoto(URL.createObjectURL(r));
      });
    });
  }, []);

  return (
    <>
      <div
        style={{
          "--photo-url": `url(${newPhoto === undefined ? photo : newPhoto})`,
        }}
        className={
          isPageOwner
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
            isPageOwner
              ? classes.fileInput + " " + classes.owner
              : classes.fileInput
          }
          type="file"
        ></input>
      </div>
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
    </>
  );
};

export default PhotoInput;
