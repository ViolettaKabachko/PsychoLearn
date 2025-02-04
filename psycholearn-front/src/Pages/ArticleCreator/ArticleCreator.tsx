import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ArticleCreator.module.css";
import Navbar from "@/Components/UI/Navbar/Navbar.tsx";
import Button from "@/Components/Button/Button.tsx";
import { mainBlue, mainPink } from "@/funcs.ts";
import { HttpGet } from "@/requests.ts";
import ArticleEditor from "@/Components/ArticleEditor/ArticleEditor.tsx";
import ToolPanel from "@/Components/ToolPanel/ToolPanell.tsx";
import { useEditorAPI } from "@/Contexts/EditorContext.tsx";
import { toast, Toaster } from "react-hot-toast";
import { stateToHTML } from "@/convert.tsx";

export const notify = () => toast.success("Draft has been saved");

const ArticleCreator = () => {
  const navigate = useNavigate();
  const { state } = useEditorAPI();
  const articleTitle = "";
  const logoClick = () => {
    navigate("/users/" + localStorage.getItem("id"));
    navigate(0);
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      HttpGet(`/verify/role`, {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      }).then((res) => {
        if (res.hasOwnProperty("err")) {
          navigate("/start");
        }
      });
    } else {
      navigate("/start");
    }
  }, []);

  return (
    <div className={classes.article_creator}>
      <Toaster position="bottom-center" />
      <div className={classes.navbar}>
        <Navbar onLogoFunc={logoClick} />
      </div>
      <div className={classes.textarea}>
        <ArticleEditor />
      </div>
      <div className={classes.edit_tools}>
        <ToolPanel />
        <div className={classes.buttons}>
          <Button onClick={() => {}} color={mainBlue}>
            Send
          </Button>
          <div>
            <br></br>
          </div>
          <Button
            onClick={() => {
              let html = stateToHTML(state.getCurrentContent());
              localStorage.setItem("draft", html);
              notify();
            }}
            color={mainPink}
          >
            Save draft
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCreator;
