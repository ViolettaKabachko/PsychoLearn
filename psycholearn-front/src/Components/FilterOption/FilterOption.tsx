import React, { ChangeEvent, FC } from "react";
import classes from "./FilterOption.module.css";

interface IFilterOptionProps {
  optionName: string;
  optionType: string;
  onChange: (e: ChangeEvent) => void;
}

const FilterOption: FC<IFilterOptionProps> = ({
  optionName,
  optionType,
  onChange,
}) => {
  return (
    <div className={classes.filter_option}>
      <input
        onChange={onChange}
        className={classes.checkbox}
        type="checkbox"
        name={optionName}
        id={optionName}
      />
      <label className={classes.label} htmlFor={optionName}>
        {optionName}
      </label>
    </div>
  );
};

export default FilterOption;
