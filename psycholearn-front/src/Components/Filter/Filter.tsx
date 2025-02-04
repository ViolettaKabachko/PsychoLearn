import React, { FC, useState } from "react";
import FilterOption from "@/Components/FilterOption/FilterOption.tsx";
import FilterSection from "@/Components/FilterSection/FilterSection.tsx";
import classes from "./Filter.module.css";
import Button from "@/Components/Button/Button.tsx";
import { genQuery } from "@/funcs.ts";

export interface IFilterOption {
  authors: {};
  tags: {};
}

const Filter: FC = () => {
  const [options, setOptions] = useState({
    authors: {},
    tags: {},
  });
  return (
    <div className={classes.filter}>
      <div className={classes.content}>
        <FilterSection
          sectionTitle={"Authors"}
          options={[
            <FilterOption
              setOptions={setOptions}
              options={options}
              optionType={"Authors"}
              optionName={"Violetta Kabaczko"}
            />,
            <FilterOption
              setOptions={setOptions}
              options={options}
              optionType={"Authors"}
              optionName={"Violetta Kabaczko1"}
            />,
            <FilterOption
              setOptions={setOptions}
              options={options}
              optionType={"Authors"}
              optionName={"Violetta Kabaczko2"}
            />,
            <FilterOption
              setOptions={setOptions}
              options={options}
              optionType={"Authors"}
              optionName={"Violetta Kabaczko3"}
            />,
            <FilterOption
              setOptions={setOptions}
              options={options}
              optionType={"Authors"}
              optionName={"Violetta Kabaczko4"}
            />,
            <FilterOption
              setOptions={setOptions}
              options={options}
              optionType={"Authors"}
              optionName={"Violetta Kabaczko5"}
            />,
            <FilterOption
              setOptions={setOptions}
              options={options}
              optionType={"Authors"}
              optionName={"Violetta Kabaczko6"}
            />,
          ]}
        />
        <FilterSection
          sectionTitle={"Tags"}
          options={[
            <FilterOption
              setOptions={setOptions}
              options={options}
              optionType={"Tags"}
              optionName={"Theories"}
            />,
            <FilterOption
              setOptions={setOptions}
              options={options}
              optionType={"Tags"}
              optionName={"Sexual behavior"}
            />,
            <FilterOption
              setOptions={setOptions}
              options={options}
              optionType={"Tags"}
              optionName={"Modern psychology"}
            />,
            <FilterOption
              setOptions={setOptions}
              options={options}
              optionType={"Tags"}
              optionName={"Children"}
            />,
          ]}
        />
        <div className={classes.apply_button}>
          <Button
            color={{
              r: 173,
              g: 252,
              b: 220,
            }}
            onClick={() => {
              console.log(options);
              console.log(genQuery(options));
            }}
            disabled={
              Object.keys(options.authors).length === 0 &&
              Object.keys(options.tags).length === 0
            }
          >
            Apply filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
