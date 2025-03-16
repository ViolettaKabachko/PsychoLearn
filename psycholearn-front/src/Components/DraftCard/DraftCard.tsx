import React, { FC } from "react";
import classes from "./DraftCard.module.css";
import Button from "@/Components/Button/Button.tsx";
import { mainBlue, mainPink } from "@/funcs.ts";

interface IDraftCardProps {
  title: string;
  description: string;
  articleDraftUrl: string;
  lastEditedDate: string;
}

const DraftCard: FC<IDraftCardProps> = ({ ...props }) => {
  return (
    <div className={classes.draft_card}>
      <div className={classes.info}>
        <div>
          <a className={classes.title} href={props.articleDraftUrl}>
            {props.title}
            {/*Сделать переиспользуемую ссылку*/}
          </a>
        </div>
        <div className={classes.description}>{props.description}</div>
      </div>
      <div className={classes.rightBlock}>
        <div>Last edit: {props.lastEditedDate}</div>
        <div className={classes.buttons}>
          <div className={classes.editButton}>
            <Button color={mainBlue} onClick={() => {}}>
              ✎
            </Button>
            {/*Создать ещё одни кнопки для этого, использовать их в редакторе*/}
          </div>
          <div className={classes.deleteButton}>
            <Button color={mainPink} onClick={() => {}}>
              ⌫
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftCard;
