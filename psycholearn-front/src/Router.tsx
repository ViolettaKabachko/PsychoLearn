import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./Pages/StartPage/StartPage.tsx";
import Profile from "./Pages/Profile/Profile.tsx";
import NotFound from "./Pages/NotFound/NotFound.tsx";
import ArticlesPage from "@/Pages/Articles/ArticlesPage.tsx";
import ArticleCreator from "@/Pages/ArticleCreator/ArticleCreator.tsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" Component={NotFound} />
        <Route path="/" Component={StartPage} />
        <Route path="/start" Component={StartPage} />
        <Route path="/users/:id" Component={Profile} />
        <Route path="/articles" Component={ArticlesPage} />
        <Route path="/articles/create_article" Component={ArticleCreator} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
