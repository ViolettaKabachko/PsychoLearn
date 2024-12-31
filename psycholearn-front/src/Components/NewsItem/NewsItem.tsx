import React, { FC } from "react";
import classes from "./NewsItem.module.css";

interface INewsItemProps {
  title: string;
  description: string;
  author: string;
  date: string;
  authorId: number;
}

const NewsItem: FC<INewsItemProps> = ({ ...props }) => {
  return (
    <div className={classes.news_item}>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.description}>{props.description}</div>
      <div className={classes.info}>
        <div className={classes.author}>
          <a href={"/users/" + props.authorId}>{props.author}</a>
        </div>
        <div className={classes.date}>{props.date}</div>
      </div>
    </div>
  );
};

export default NewsItem;
