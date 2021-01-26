import React, { useState, useContext } from "react";
import styles from "./QuickAdd.module.scss";
import ButtonIconSmall from "../ButtonIconSmall/ButtonIconSmall";
import cx from "classnames";
import momentAdapter from "../../utilities/utils/moment";
import DatePicker from "react-date-picker";
import { PlanContext } from "../../context/PlanContext";

const QuickAdd = ({ item, setOpen, custom }) => {
  const { addRecipeToPlan } = useContext(PlanContext);
  const [date, setDate] = useState("");
  const [meal, setMeal] = useState("");
  const wrapperClass = cx(styles.wrapper, custom);

  const handleAddRecipe = (date, meal, item) => {
    const newPlanItem = {
      _id: item._id,
      title: item.title,
    };
    addRecipeToPlan(date, meal, newPlanItem);
    setOpen(false);
  };
  return (
    <section className={wrapperClass}>
      <h2 className={styles.heading}>Add recipe to your plan</h2>
      <div>
        <p className={styles.paragraph}>
          Selected recipe: <b>{item.title}</b>
        </p>
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
        <select
          name="meal"
          className={styles.select}
          value={meal}
          onChange={(event) => setMeal(event.target.value)}
        >
          <option value="">select a meal</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snacks">Snacks</option>
        </select>
      </div>
      <div className={styles.buttons}>
        <ButtonIconSmall
          bgImage="buttonDelete"
          btnSize="btn20"
          onClick={() => setOpen(false)}
        />
        <ButtonIconSmall
          bgImage="buttonAdd"
          btnSize="btn30"
          onClick={() => handleAddRecipe(date, meal, item)}
        />
      </div>
    </section>
  );
};

export default QuickAdd;
