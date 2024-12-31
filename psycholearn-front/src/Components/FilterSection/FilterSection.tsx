import React, { FC, useState } from "react";
import classes from "./FilterSection.module.css";

interface IFilterSectionProps {
  sectionTitle: string;
  options: React.ReactNode[];
  count?: number;
}

const FilterSection: FC<IFilterSectionProps> = ({
  options,
  sectionTitle,
  count = 3,
}) => {
  const [visibleCount, setVisibleCount] = useState(count);
  return (
    <div className={classes.filterSection}>
      <div className={classes.title}>{sectionTitle}</div>
      <div>{options.slice(0, visibleCount)}</div>
      <div className={classes.arrows}>
        {visibleCount <= options.length && (
          <div
            className={classes.arrowDown}
            onClick={() => setVisibleCount(visibleCount + 3)}
          >
            {"Show more"}
          </div>
        )}
        {count !== visibleCount && (
          <div
            className={classes.arrowUp}
            onClick={() => setVisibleCount(visibleCount - 3)}
          >
            {"Hide"}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
