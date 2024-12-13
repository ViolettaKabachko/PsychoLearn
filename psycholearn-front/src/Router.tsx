import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./Pages/StartPage/StartPage.tsx";
import Profile from "./Pages/Profile/Profile.tsx";
import NotFound from "./Pages/NotFound/NotFound.tsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" Component={NotFound} />
        <Route path="/" Component={StartPage} />
        <Route path="/start" Component={StartPage} />
        <Route path="/users/:id" Component={Profile} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
