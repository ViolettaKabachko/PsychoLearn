import React, { FC, PropsWithChildren } from "react";
import FilterOption from "@/Components/FilterOption/FilterOption.tsx";
import FilterSection from "@/Components/FilterSection/FilterSection.tsx";
import classes from "./Filter.module.css";

const Filter: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes.filter}>
      <FilterSection
        sectionTitle={"Authors"}
        options={[
          <FilterOption optionName={"Violetta Kabaczko"} />,
          <FilterOption optionName={"Violetta Kabaczko1"} />,
          <FilterOption optionName={"Violetta Kabaczko2"} />,
          <FilterOption optionName={"Violetta Kabaczko3"} />,
          <FilterOption optionName={"Violetta Kabaczko4"} />,
          <FilterOption optionName={"Violetta Kabaczko5"} />,
          <FilterOption optionName={"Violetta Kabaczko6"} />,
        ]}
      />
      <FilterSection
        sectionTitle={"Tags"}
        options={[
          <FilterOption optionName={"Theories"} />,
          <FilterOption optionName={"Sexual behavior"} />,
          <FilterOption optionName={"Modern psychology"} />,
          <FilterOption optionName={"Children"} />,
        ]}
      />
      <FilterSection
        sectionTitle={"Tags"}
        options={[
          <FilterOption optionName={"Theories"} />,
          <FilterOption optionName={"Sexual behavior"} />,
          <FilterOption optionName={"Modern psychology"} />,
          <FilterOption optionName={"Children"} />,
        ]}
      />
      <FilterSection
        sectionTitle={"Tags"}
        options={[
          <FilterOption optionName={"Theories"} />,
          <FilterOption optionName={"Sexual behavior"} />,
          <FilterOption optionName={"Modern psychology"} />,
          <FilterOption optionName={"Children"} />,
        ]}
      />
    </div>
  );
};

export default Filter;
