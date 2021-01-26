import React from "react";
import styles from "./RecipesPageHeader.module.scss";
import Heading from "../../../shared/Heading/Heading";
import ButtonIcon from "../../../shared/ButtonIcon/ButtonIcon";
import Search from "../../../shared/Search/Search";
import RecipesPageButtons from "./RecipesPageButtons/RecipesPageButtons";

const RecipesPageHeader = ({
  toggle,
  buttonsProps,
  inputContent,
  handleInputChange,
}) => {
  return (
    <div>
      <Heading custom={styles.heading}>Recipes</Heading>
      <div className={styles.wrapper}>
        <RecipesPageButtons options={buttonsProps} />
        <Search
          custom={styles.search}
          value={inputContent.toLowerCase()}
          onChange={handleInputChange}
        />
        <div className={styles.buttonWrapper}>
          <ButtonIcon
            bgColor="bgPrimary"
            custom={styles.buttonAdd}
            onClick={toggle}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipesPageHeader;
