import React from "react";
import styles from "./DayPlanDetails.module.scss";
import Heading from "../../atoms/Heading/Heading";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import ButtonIconSmall from "../../atoms/ButtonIconSmall/ButtonIconSmall";
import RecipeCard from "../../molecules/RecipeCard/RecipeCard";
import { meals } from "../../../constans/index";

const DayPlanDetails = ({
  dayPlan,
  toggle,
  setOpenDelete,
  isOpenDelete,
  handleQuickAdd,
  setPlanToEdit,
}) => {
  return (
    <div className={styles.container} id="content">
      <div className={styles.header}>
        <Heading custom={styles.heading}>{dayPlan && dayPlan.day}</Heading>
        <Paragraph custom={styles.headingParagraph}>
          {dayPlan && dayPlan.date}
        </Paragraph>
        <div className={styles.buttons}>
          <ButtonIconSmall
            bgImage="buttonDelete"
            btnSize="btn20"
            onClick={() => setOpenDelete(!isOpenDelete)}
            type="button"
            custom={styles.button}
          ></ButtonIconSmall>
          <ButtonIconSmall
            bgImage="buttonAdd"
            btnSize="btn30"
            onClick={() => {
              toggle();
              setPlanToEdit(dayPlan);
            }}
            type="button"
            custom={styles.button}
          ></ButtonIconSmall>
        </div>
      </div>
      <div className={styles.planWrapper}>
        {dayPlan &&
          meals.map((meal) => {
            if (dayPlan.plan[meal].length !== 0) {
              return (
                <div key={meal} className={styles.mealPlanWrapper}>
                  <h2>{meal}</h2>
                  <div className={styles.recepiesContainer}>
                    {dayPlan.plan[meal].map((recipe) => (
                      <div key={`${meal}-${recipe._id}`}>
                        <RecipeCard
                          item={recipe}
                          handleQuickAdd={handleQuickAdd}
                          small
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>
    </div>
  );
};

export default DayPlanDetails;
