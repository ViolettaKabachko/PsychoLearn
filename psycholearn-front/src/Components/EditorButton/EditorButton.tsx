import React, { FC, MouseEvent } from "react";
import classes from "./EditorButton.module.css";
import { BlockType, InlineStyle } from "@/editorConfig.ts";

interface IEditorButtonProps {
  code: InlineStyle | BlockType;
  onMouseDown: (e: MouseEvent) => void;
}

const EditorButton: FC<IEditorButtonProps> = ({ code, onMouseDown }) => {
  const [clicked, setClicked] = React.useState(false);
  return (
    <div className={classes.toggle_div}>
      <button
        key={code}
        className={
          clicked ? classes.toggle + " " + classes.active : classes.toggle
        }
        onMouseDown={(e) => {
          setClicked(!clicked);
          onMouseDown(e);
        }}
      >
        {code}
      </button>
    </div>
  );
};

export default EditorButton;
