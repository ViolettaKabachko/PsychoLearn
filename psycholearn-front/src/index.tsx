import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.tsx";
import PageOwnerProvider from "./Contexts/PageOwnerContext";
import "./common.css";
import { EditorContextProvider } from "@/Contexts/EditorContext.tsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PageOwnerProvider>
    <EditorContextProvider>
      <Router />
    </EditorContextProvider>
  </PageOwnerProvider>,
);
