import { EditorAPI, useEditor } from "@/Hooks/useEditor.tsx";
import { createContext, FC, PropsWithChildren, useContext } from "react";

const TextEditorContext = createContext<EditorAPI | undefined>(undefined);

export const useEditorAPI = () => {
  const context = useContext(TextEditorContext);
  if (context === undefined) {
    throw new Error("useEditorAPI must be used within the editor");
  }
  return context;
};

export const EditorContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const html: string = localStorage.getItem("draft");

  const editorApi = useEditor(html);

  return (
    <TextEditorContext.Provider value={editorApi}>
      {children}
    </TextEditorContext.Provider>
  );
};
