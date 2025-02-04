import React from "react";
import { useEditorAPI } from "@/Contexts/EditorContext.tsx";
import { BlockType, InlineStyle } from "@/editorConfig.ts";
import classes from "./ToolPanel.module.css";
import { addImage } from "contenido";
import { convertToRaw } from "draft-js";
import EditorButton from "@/Components/EditorButton/EditorButton.tsx";

const INLINE_STYLES_CODES = Object.values(InlineStyle);
const BLOCK_STYLES_CODES = Object.values(BlockType);

const ToolPanel: React.FC = () => {
  const { state, onChange, toggleInlineStyle, toggleBlockType } =
    useEditorAPI();

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const imageProps = {
      src: url,
      alt: "image",
      style: {
        maxWidth: "50%",
        maxHeight: "10%",
      },
    };
    addImage(state, onChange, imageProps);
    console.log(convertToRaw(state.getCurrentContent()));
  };

  return (
    <div className={classes.toggle_panel}>
      {INLINE_STYLES_CODES.map((code) => (
        <EditorButton
          code={code}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInlineStyle(code);
          }}
        />
      ))}
      {BLOCK_STYLES_CODES.map((code) => (
        <EditorButton
          code={code}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType(code);
          }}
        />
      ))}
      {/*<div className={classes.toggle_div}>*/}
      {/*<div className={classes.toggle}>*/}
      {/*  ADD IMAGE*/}
      {/*  <input*/}
      {/*    type="file"*/}
      {/*    onChange={handleAddImage}*/}
      {/*    className={classes.input_image}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*</div>*/}
    </div>
  );
};

export default ToolPanel;
