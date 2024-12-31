import React, { FC } from "react";
import classes from "./FilterOption.module.css";

interface IFilterOptionProps {
  optionName: string;
}

const FilterOption: FC<IFilterOptionProps> = ({ optionName }) => {
  return (
    <div className={classes.filter_option}>
      <input className={classes.checkbox} type="checkbox" id={optionName} />
      <label className={classes.label} htmlFor={optionName}>
        {optionName}
      </label>
    </div>
  );
};

export default FilterOption;
