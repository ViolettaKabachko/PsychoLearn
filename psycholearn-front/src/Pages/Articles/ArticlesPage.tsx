import React from "react";
import classes from "./ArticlesPage.module.css";
import Navbar from "@/Components/UI/Navbar/Navbar.tsx";
import SearchField from "@/Components/SearchField/SearchField.tsx";
import Filter from "@/Components/Filter/Filter.tsx";
import ArticleList from "@/Components/ArticleList/ArticleList.tsx";
import { useNavigate } from "react-router-dom";

const ArticlesPage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();
  const logoClick = () => {
    navigate("/users/" + localStorage.getItem("id"));
    navigate(0);
  };
  return (
    <div className={classes.articles_page}>
      <div className={classes.navbar}>
        <Navbar onLogoFunc={logoClick} />
      </div>
      <div className={classes.search_field_container}>
        <SearchField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ArticleList />
      <div className={classes.filter}>
        <Filter />
      </div>
    </div>
  );
};

export default ArticlesPage;
