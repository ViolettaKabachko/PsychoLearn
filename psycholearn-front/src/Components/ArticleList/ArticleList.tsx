import React from "react";
import classes from "./ArticleList.module.css";
import ArticleCard from "@/Components/PostCard/ArticleCard.tsx";

const ArticleList = () => {
  return (
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
  );
};

export default ArticleList;
