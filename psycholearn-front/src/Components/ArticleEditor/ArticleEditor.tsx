import React, { FC, useEffect, useMemo } from "react";
import classes from "./ArticleEditor.module.css";
import { useEditorAPI } from "@/Contexts/EditorContext.tsx";
import { CUSTOM_STYLE_MAP } from "@/editorConfig.ts";
import { Editor } from "contenido";
import { stateToHTML } from "@/convert.tsx";
import { notify } from "@/Pages/ArticleCreator/ArticleCreator.tsx";

const ArticleEditor: FC = () => {
  const { state, onChange } = useEditorAPI();
  const saveDraft = () => {
    console.log("Saving draft");
    let html = stateToHTML(state.getCurrentContent());
    localStorage.setItem("draft", html);
    notify();
  };

  const timeout = useMemo(() => {
    return setTimeout(saveDraft, 3000);
  }, [state]);

  useEffect(() => {
    return () => clearTimeout(timeout);
  }, [state]);

  return (
    <div className={classes.editor}>
      <Editor
        editorState={state}
        onChange={(state) => {
          onChange(state);
          clearTimeout(timeout);
        }}
        customStyleMap={CUSTOM_STYLE_MAP}
      />
    </div>
  );
};

export default ArticleEditor;
