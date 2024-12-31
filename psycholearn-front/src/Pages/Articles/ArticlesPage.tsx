import React from "react";
import classes from "./ArticlesPage.module.css";
import Navbar from "@/Components/UI/Navbar/Navbar.tsx";
import SearchField from "@/Components/SearchField/SearchField.tsx";
import ArticleCard from "@/Components/PostCard/ArticleCard.tsx";
import Filter from "@/Components/Filter/Filter.tsx";

const ArticlesPage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <div className={classes.articles_page}>
      <div className={classes.navbar}>
        <Navbar onLogoFunc={() => {}} />
      </div>
      <div className={classes.search_field_container}>
        <div className={classes.search_field}>
          <SearchField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className={classes.article_list}>
        <div className={classes.postcard}>
          <ArticleCard
            title={"Psychodynamic theory"}
            url={"http://localhost:3000/articles"}
            description={"A theory developed by Zigmund Freyd"}
            author={"Zigmund Freyd"}
            tags={["theories", "sexual behavior"]}
          />
        </div>
        <div className={classes.postcard}>
          <ArticleCard
            title={"Psychodynamic theory"}
            url={"http://localhost:3000/articles"}
            description={"A theory developed by Zigmund Freyd"}
            author={"Zigmund Freyd"}
            tags={["theories", "sexual behavior"]}
          />
        </div>
        <div className={classes.postcard}>
          <ArticleCard
            title={"Psychodynamic theory"}
            url={"http://localhost:3000/articles"}
            description={"A theory developed by Zigmund Freyd"}
            author={"Zigmund Freyd"}
            tags={["theories", "sexual behavior"]}
          />
        </div>
        <div className={classes.postcard}>
          <ArticleCard
            title={"Psychodynamic theory"}
            url={"localhost:3000/articles"}
            description={"A theory developed by Zigmund Freyd"}
            author={"Zigmund Freyd"}
            tags={["theories", "sexual behavior"]}
          />
        </div>
      </div>
      <div className={classes.filter}>
        <Filter />
      </div>
    </div>
  );
};

export default ArticlesPage;
