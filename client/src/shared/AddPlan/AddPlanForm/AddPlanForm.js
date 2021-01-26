import React from "react";
import styles from "./AddPlanForm.module.scss";
import FormAddTemplate from "../../../templates/FormAddTemplate/FormAddTemplate";
import Card from "../../Card/Card";
import Button from "../../Button/Button";
import { meals } from "../../../constans/index";
import momentAdapter from "../../../utilities/utils/moment";
import DatePicker from "react-date-picker";
import { useLocation } from "react-router";

const AddPlanForm = ({
  date,
  setDate,
  handleAddRecipe,
  handleDeleteRecipe,
  toggle,
  classOpen,
  savedRecipes,
  handleSubmit,
}) => {
  const location = useLocation();
  let buttonText;
  if (location.pathname === "/plan") {
    buttonText = "Add";
  } else {
    buttonText = "Save";
  }

  return (
    <FormAddTemplate classOpen={classOpen} toggle={toggle}>
      <form className={styles.form}>
        <label className={styles.label} htmlFor="day">
          Which day do you want to plan?
        </label>
        <div>
          <DatePicker
            onChange={setDate}
            value={date}
            format={"y-MM-dd"}
            minDate={new Date()}
            className={styles.datePicker}
            calendarClassName={styles.calendar}
            required={true}
          />
          {date && (
            <p className={styles.displayDay}>
              {momentAdapter(date, "dddd").formatDate}
            </p>
          )}
        </div>
        <div className={styles.wrapper}>
          {date !== "" && (
            <>
              <h3 className={styles.heading}>
                Plan your week by adding recipes from the list
              </h3>
              <div className={styles.meals}>
                {meals.map((meal) => (
                  <Card
                    key={meal}
                    meal={meal}
                    handleAddRecipe={handleAddRecipe}
                    handleDelete={handleDeleteRecipe}
                    savedRecipes={savedRecipes[meal]}
                  />
                ))}
              </div>
            </>
          )}
          <Button
            type="submit"
            bgColor="bgSecondary"
            custom={styles.button}
            onClick={handleSubmit}
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </FormAddTemplate>
  );
};

export default AddPlanForm;
