import { NavigateFunction } from "react-router-dom";

export const toSnakeCase = (text: string) => {
  return text
    .split(" ")
    .map((x) => x.toLowerCase())
    .join("_");
};

export const genQuery = (obj: { [key: string]: { [key: string]: string } }) => {
  let query = [];
  for (let key in obj) {
    if (Object.values(obj[key]).length !== 0) {
      query.push(
        key +
          "=" +
          Object.keys(obj[key])
            .map((x) => toSnakeCase(x))
            .join(","),
      );
    }
  }
  console.log(query);
  return query.join("&");
};

export const logoClick = (navFunc: NavigateFunction) => {
  navFunc("/users/" + localStorage.getItem("id"));
  navFunc(0);
};

export const mainBlue = { r: 149, g: 237, b: 219 };

export const mainPink = { r: 255, g: 193, b: 194 };
