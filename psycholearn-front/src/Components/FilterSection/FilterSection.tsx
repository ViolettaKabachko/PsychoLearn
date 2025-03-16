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
      <div className={classes.content}>
        <div className={classes.title}>{sectionTitle}</div>
        <div
          className={classes.visibleTags}
          style={{
            height: `${visibleCount * 26}px`,
          }}
        >
          {options.slice(0, visibleCount)}
        </div>
        <div className={classes.arrows}>
          {visibleCount <= options.length && (
            <div
              className={classes.arrowDown}
              onClick={() =>
                setVisibleCount(Math.min(visibleCount + 3, options.length))
              }
            >
              {"Show more"}
            </div>
          )}
          {count !== visibleCount && (
            <div
              className={classes.arrowUp}
              onClick={() => setVisibleCount(Math.max(visibleCount - 3, 3))}
            >
              {"Hide"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
