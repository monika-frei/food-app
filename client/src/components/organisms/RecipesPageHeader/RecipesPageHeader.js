import React from "react";
import styles from "./RecipesPageHeader.module.scss";
import Heading from "../../atoms/Heading/Heading";
import ButtonIcon from "../../atoms/ButtonIcon/ButtonIcon";
import Search from "../../atoms/Search/Search";
import RecipesPageButtons from "../../molecules/RecipesPageButtons/RecipesPageButtons";

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
