import React from "react";
import styles from "./Search.module.scss";
import cx from "classnames";

const Search = ({ custom, onChange }) => {
  const inputClass = cx(styles.input, custom);

  return (
    <input
      className={inputClass}
      type="text"
      onChange={onChange}
      placeholder="what do you want to eat?"
    ></input>
  );
};

export default Search;
