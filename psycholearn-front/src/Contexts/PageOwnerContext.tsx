import React, { FC, PropsWithChildren, useState } from "react";
import defaultProfilePicture from "@/Images/default.svg";

export const PageOwnerContext = React.createContext(null);

const PageOwnerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isPageOwner, setIsPageOwner] = useState<boolean>();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(defaultProfilePicture);
  const [role, setRole] = useState(1);
  const [about, setAbout] = useState("");

  return (
    <PageOwnerContext.Provider
      value={{
        isPageOwner,
        setIsPageOwner,
        name,
        setName,
        surname,
        setSurname,
        email,
        setEmail,
        photo,
        setPhoto,
        role,
        setRole,
        about,
        setAbout,
      }}
    >
      {children}
    </PageOwnerContext.Provider>
  );
};

export default PageOwnerProvider;
