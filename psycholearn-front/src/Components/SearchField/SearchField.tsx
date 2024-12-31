import React, { FC } from "react";
import classes from "./SearchField.module.css";

interface ISearchFieldProps {
  value: string;
  onChange: (any) => void;
}

const SearchField: FC<ISearchFieldProps> = ({ value, onChange }) => {
  return (
    <div>
      <input
        className={classes.search_field}
        placeholder="Search"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchField;
