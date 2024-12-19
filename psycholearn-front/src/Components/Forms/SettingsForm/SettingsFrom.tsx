import React, { useContext, useEffect, useState } from "react";
import Input from "@/Components/Input/Input.tsx";
import Button from "@/Components/Button/Button.tsx";
import { PageOwnerContext } from "@/Contexts/PageOwnerContext.tsx";
import { HttpPost } from "@/requests.ts";
import { useParams } from "react-router-dom";
import ValidationLine from "@/Components/ValidationLine/ValidationLine.tsx";

const SettingsFrom = () => {
  const { id } = useParams();
  const { name, setName, surname, setSurname, about, setAbout } =
    useContext(PageOwnerContext);
  const [changedName, setChangedName] = useState<string>();
  const [changedSurname, setChangedSurname] = useState<string>("");
  const [changedAbout, setChangedAbout] = useState<string>("");
  const [currentLength, setCurrentLength] = useState<number>();

  useEffect(() => {
    setChangedName(name);
    setChangedSurname(surname);
    setChangedAbout(about);
    setCurrentLength(about.length);
  }, [name, surname, about]);

  return (
    <>
      <Input
        value={changedName}
        onChange={(e) => setChangedName(e.target.value)}
        placeholder="Name"
      ></Input>
      <Input
        value={changedSurname}
        onChange={(e) => setChangedSurname(e.target.value)}
        placeholder="Surname"
      ></Input>
      <Input
        value={changedAbout}
        onChange={(e) => {
          setChangedAbout(e.target.value);
          setCurrentLength(e.target.value.length);
        }}
        placeholder="About"
      ></Input>

      <ValidationLine
        text={changedAbout}
        func={(text) => {
          return text.length <= 50;
        }}
      >
        Allowed length: {currentLength} / 50
      </ValidationLine>
      <Button
        onClick={async () => {
          await HttpPost(
            "/users/" + id + "/update_data",
            {
              name: changedName,
              surname: changedSurname,
              about: changedAbout,
            },
            {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "application/json",
            },
          );
          setName(changedName);
          setSurname(changedSurname);
          setAbout(changedAbout);
        }}
        disabled={
          [
            changedAbout === about,
            changedName === name,
            changedSurname === surname,
          ].every((x) => x !== false) || !(changedAbout.length <= 50)
        }
        color={{ r: 149, g: 237, b: 219 }}
      >
        Save changes
      </Button>
    </>
  );
};

export default SettingsFrom;
