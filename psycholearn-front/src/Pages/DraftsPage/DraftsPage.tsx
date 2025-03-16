import React from "react";
import classes from "./DraftsPage.module.css";
import Navbar from "@/Components/UI/Navbar/Navbar.tsx";
import { logoClick, mainBlue } from "@/funcs.ts";
import { useNavigate } from "react-router-dom";
import DraftCard from "@/Components/DraftCard/DraftCard.tsx";
import Button from "@/Components/Button/Button.tsx";

const DraftsPage = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.drafts_page}>
      <div className={classes.navbar}>
        <Navbar onLogoFunc={() => logoClick(navigate)} />
      </div>
      <div className={classes.drafts}>
        <DraftCard
          title={"Cumshots"}
          description={"Does cumshots make skin better?"}
          articleDraftUrl={"/"}
          lastEditedDate={"25.02.2025"}
        />
      </div>
      <div className={classes.newArticle}>
        <Button
          color={mainBlue}
          onClick={() => {
            navigate("/articles/create_article");
          }}
        >
          New article
        </Button>
      </div>
      <div className={classes.pagination}>pagination...</div>
    </div>
  );
};

export default DraftsPage;
