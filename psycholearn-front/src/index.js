import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.jsx";
import PageOwnerProvider from "./Contexts/PageOwnerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PageOwnerProvider>
    <Router />
  </PageOwnerProvider>,
);
