import React, { FC } from "react";
import classes from "./FilterOption.module.css";
import { IFilterOption } from "@/Components/Filter/Filter.tsx";

interface IFilterOptionProps {
  optionName: string;
  optionType: string;
  setOptions: (any) => void;
  options: IFilterOption;
}

const FilterOption: FC<IFilterOptionProps> = ({
  optionName,
  optionType,
  setOptions,
  options,
}) => {
  return (
    <div className={classes.filter_option}>
      <input
        onChange={(e) => {
          const { name, checked } = e.target;
          if (checked) {
            setOptions({
              ...options,
              [optionType.toLowerCase()]: {
                ...options[optionType.toLowerCase()],
                [name]: checked,
              },
            });
          } else {
            const newOptions = { ...options };
            delete newOptions[optionType.toLowerCase()][name];
            setOptions(newOptions);
          }
        }}
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
