import React, { useContext } from "react";
import styles from "./GroceryListTemplate.module.scss";
import Button from "../../components/atoms/Button/Button";
import PopUpListItem from "../../components/molecules/PopUpListItem/PopUpListItem";
import GroceryList from "../../components/organisms/GroceryList/GroceryList";
import cx from "classnames";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import LoadingSpinner from "../../components/atoms/LoadingSpinner/LoadingSpinner";

const GroceryListTemplate = ({
  handleSelectOption,
  handleAddItem,
  setActivePopUp,
  selectedDays,
  classActiveBtn,
  activePopUp,
  groceryList,
  getFilteredIngredientsArray,
  editIngredients,
  setEditIngredients,
}) => {
  const { plan } = useContext(GlobalContext);
  if (plan.length > 0) {
    return (
      <div className={styles.wrapper}>
        <h3>Which days do you want to include in your list?</h3>
        <div className={styles.buttons}>
          <Button
            key="all"
            bgColor="bgTertiary"
            custom={
              selectedDays.includes("all")
                ? cx(styles.button, {
                    [`${styles.classActiveBtn}`]: classActiveBtn,
                  })
                : styles.button
            }
            onClick={() => handleSelectOption("all")}
          >
            all
          </Button>
          {plan.map((item) => {
            return (
              <Button
                key={item._id}
                bgColor="bgTertiary"
                custom={
                  selectedDays.includes(item.date)
                    ? cx(styles.button, {
                        [`${styles.classActiveBtn}`]: classActiveBtn,
                      })
                    : styles.button
                }
                onClick={() => handleSelectOption(item.date)}
              >
                <span>{item.date}</span>
                <span>{item.day}</span>
              </Button>
            );
          })}
        </div>
        {/* <Button
          bgColor="bgTertiary"
          custom={styles.buttonGenerate}
          onClick={() => getFilteredIngredientsArray()}
        >
          Generate new list
        </Button> */}
        {groceryList.length > 0 && (
          <GroceryList
            setActivePopUp={setActivePopUp}
            editIngredients={editIngredients}
            setEditIngredients={setEditIngredients}
          />
        )}

        {activePopUp && (
          <PopUpListItem
            handleAddItem={handleAddItem}
            setActivePopUp={setActivePopUp}
          />
        )}
      </div>
    );
  } else {
    return (
      <div className={styles.buttonWrapper}>
        <Link to="/plan">
          <Button bgColor="bgTertiary" custom={styles.buttonGenerate}>
            Plan your meals!
          </Button>
        </Link>
      </div>
    );
  }
};

export default GroceryListTemplate;
