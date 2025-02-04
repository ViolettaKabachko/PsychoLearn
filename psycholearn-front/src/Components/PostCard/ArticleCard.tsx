import React, { FC } from "react";
import classes from "./ArticleCard.module.css";
import { toSnakeCase } from "@/funcs.ts";

interface IPostCardProps {
  title: string;
  url: string;
  description: string;
  author: string;
  tags: string[];
}

const ArticleCard: FC<IPostCardProps> = ({ ...props }) => {
  return (
    <div className={classes.postcard}>
      <div className={classes.title}>
        <a className={classes.title_href} href={props.url}>
          {props.title}
        </a>
      </div>
      <div className={classes.description}>{props.description}</div>
      <div className={classes.bottom}>
        <div className={classes.tags}>
          {props.tags.map((tag) => (
            <a
              className={classes.tag}
              href={
                "http://localhost:3000/articles/search?tags=" + toSnakeCase(tag)
              }
            >
              {tag}
            </a>
          ))}
        </div>
        <div className={classes.author}>
          <a className={classes.author_href} href={"/"}>
            {props.author}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
