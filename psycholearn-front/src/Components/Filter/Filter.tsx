import React, { FC, useState } from "react";
import FilterSection from "@/Components/FilterSection/FilterSection.tsx";
import classes from "./Filter.module.css";
import Button from "@/Components/Button/Button.tsx";
import { genQuery } from "@/funcs.ts";
import FilterOption from "@/Components/FilterOption/FilterOption.tsx";

export interface IFilterOption {
  authors: {};
  tags: {};
}

const Filter: FC = () => {
  const [options, setOptions] = useState({
    authors: {},
    tags: {},
  });

  const fetchedTagsList = {
    authors: [
      "Violetta Kabaczko",
      "Violetta Kabaczko1",
      "Violetta Kabaczko2",
      "Violetta Kabaczko3",
      "Violetta Kabaczko4",
      "Violetta Kabaczko5",
      "Violetta Kabaczko6",
      "Violetta Kabaczko7",
    ],
    tags: ["Theories", "Sexual behaviour", "Modern psychology", "Childeren"],
  };

  const onChange = (e, optionType: string) => {
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
    console.log("bim");
  };

  return (
    <div className={classes.filter}>
      <div className={classes.content}>
        {Object.keys(fetchedTagsList).map((tag) => (
          <FilterSection
            sectionTitle={tag[0].toUpperCase() + tag.slice(1)}
            options={fetchedTagsList[tag].map((filterOption) => (
              <FilterOption
                optionName={filterOption}
                optionType={tag}
                onChange={(e) => onChange(e, tag)}
              />
            ))}
          />
        ))}
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
