import React from "react";
import { useLocation } from "react-router";
import styles from "./AddRecipeForm.module.scss";
import cx from "classnames";
import FormAddTemplate from "../../../templates/FormAddTemplate/FormAddTemplate";
import ButtonIconSmall from "../../ButtonIconSmall/ButtonIconSmall";
import Button from "../../Button/Button";
import ListItem from "../../ListItem/ListItem";
import Warning from "../../Warning/Warning";
import { meals as mealsOptions } from "../../../constans";

const AddRecipeForm = ({
  classOpen,
  toggle,
  title,
  setTitle,
  meals,
  ingredientTitle,
  setIngredientTitle,
  ingredientAmount,
  setIngredientAmount,
  ingredientUnit,
  setIngredientUnit,
  time,
  setTime,
  servings,
  setServings,
  addInfo,
  setAddInfo,
  editStep,
  step,
  content,
  setContent,
  ingredients,
  preparation,
  handleAddIngredient,
  handleDeleteIngredient,
  handleStepChange,
  handleAddPrepStep,
  handleEditPrepStep,
  handleDeletePrepStep,
  handleInputMeals,
  handleFileUpload,
  handleSubmit,
  warningOpen,
  setWarningOpen,
  warningField,
  setWarningField,
}) => {
  const location = useLocation();
  let buttonText;
  if (location.pathname === "/recipes") {
    buttonText = "Add";
  } else {
    buttonText = "Save";
  }
  return (
    <FormAddTemplate classOpen={classOpen} toggle={toggle}>
      <form className={styles.form}>
        <div>
          <label htmlFor="title">Write a title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            className={styles.titleInput}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="file">Add recipe image</label>
          <input
            type="file"
            name="file"
            id="file"
            className={styles.titleInput}
            onChange={(e) => handleFileUpload(e)}
          ></input>
        </div>
        <p className={styles.paragraphLabel}>Choose category of the recipe:</p>
        <div className={styles.wrapper}>
          {mealsOptions.map((meal) => {
            return (
              <div className={styles.mealInput} key={meal}>
                <input
                  type="checkbox"
                  name={meal}
                  id={meal}
                  value={meal}
                  className={styles.hidden}
                  onChange={(e) => handleInputMeals(e)}
                ></input>
                <label
                  htmlFor={meal}
                  className={cx(styles.label, {
                    [`${styles.selectedMeal}`]: meals.includes(meal),
                  })}
                >
                  {meal}
                </label>
              </div>
            );
          })}
        </div>
        <div className={styles.container}>
          <p className={styles.paragraphLabel}>Ingredients</p>
          <div className={styles.ingredientWrapper}>
            <div>
              <label htmlFor="ingredientTitle">Type an ingredient:</label>
              <input
                type="text"
                name="ingredientTitle"
                id="ingredientTitle"
                value={ingredientTitle}
                className={styles.titleInput}
                onChange={(e) => setIngredientTitle(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={ingredientAmount}
                onChange={(e) => setIngredientAmount(e.target.value)}
              ></input>
            </div>
            <label htmlFor="unit">
              Choose unit:
              <select
                value={ingredientUnit}
                name="unit"
                onChange={(e) => setIngredientUnit(e.target.value)}
              >
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="ml">ml</option>
                <option value="l">l</option>
                <option value="tsp">tsp</option>
                <option value="tbsp">tbsp</option>
                <option value="pinch">pinch</option>
                <option value="-">-</option>
              </select>
            </label>
            <ButtonIconSmall
              bgImage="buttonAdd"
              btnSize="btn30"
              type="button"
              custom={styles.button}
              onClick={handleAddIngredient}
            ></ButtonIconSmall>
          </div>
          {ingredients.length !== 0 && (
            <ul className={styles.ingredientsList}>
              {ingredients.map((item) => {
                return (
                  <ListItem
                    key={item.id}
                    item={item}
                    handleDeleteIngredient={() => handleDeleteIngredient(item)}
                  />
                );
              })}
            </ul>
          )}
        </div>
        <div className={styles.preparationWrapper}>
          <p className={styles.paragraphLabel}>Preparation</p>
          <div>
            <label htmlFor="content">Step</label>
            <input
              name="step"
              type="number"
              value={editStep ? editStep : step}
              max="100"
              maxLength="2"
              className={styles.inputStep}
              onChange={(e) => handleStepChange(e)}
            ></input>
          </div>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <ButtonIconSmall
            bgImage="buttonAdd"
            btnSize="btn30"
            type="button"
            custom={styles.button}
            onClick={handleAddPrepStep}
          ></ButtonIconSmall>
          {preparation.length !== 0 && (
            <ul>
              {preparation
                .sort((a, b) => a.step - b.step)
                .map((item) => {
                  return (
                    <li key={item.step}>
                      <p className={styles.paragraphLabel}>
                        <span>Step {item.step}</span>
                        <ButtonIconSmall
                          bgImage="buttonEdit"
                          btnSize="btn20"
                          type="button"
                          custom={styles.button}
                          onClick={() => handleEditPrepStep(item)}
                        ></ButtonIconSmall>
                        <ButtonIconSmall
                          bgImage="buttonDelete"
                          btnSize="btn20"
                          type="button"
                          custom={styles.button}
                          onClick={() => handleDeletePrepStep(item)}
                        ></ButtonIconSmall>
                      </p>
                      {item.content}
                    </li>
                  );
                })}
            </ul>
          )}
        </div>
        <div className={styles.extraWrapper}>
          <p className={styles.paragraphLabel}>Extra info</p>
          <div className={styles.rowWrapper}>
            <div>
              <label htmlFor="time">Preparation time:</label>
              <input
                type="text"
                name="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="servings">Servings:</label>
              <input
                type="text"
                name="servings"
                id="servings"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
              ></input>
            </div>
          </div>
          <label htmlFor="addInfo">Additional info:</label>
          <textarea
            id="addInfo"
            name="addInfo"
            value={addInfo}
            onChange={(e) => setAddInfo(e.target.value)}
          ></textarea>
          <div className={styles.warningWrapper}>
            {warningOpen && (
              <Warning
                setWarningOpen={setWarningOpen}
                warningOpen={warningOpen}
                warningField={warningField}
                setWarningField={setWarningField}
              />
            )}
          </div>
        </div>
        <Button
          type="submit"
          bgColor="bgPrimary"
          onClick={(e) => handleSubmit(e)}
        >
          {buttonText}
        </Button>
      </form>
    </FormAddTemplate>
  );
};

export default AddRecipeForm;
