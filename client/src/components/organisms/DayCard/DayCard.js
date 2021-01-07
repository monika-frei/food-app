import React from "react";
import Card from "../../molecules/Card/Card";
import styles from "./DayCard.module.scss";
import { meals } from "../../../constans/index";
import { Link } from "react-router-dom";

const DayCard = ({ day, plan = [], date, planId }) => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <Link to={`/plan/${planId}`}>
          <div>
            <h2 className={styles.heading}>{day}</h2>
            <p className={styles.date}>{date}</p>
            <button className={styles.buttonMore}></button>
          </div>
        </Link>
      </div>
      {meals.map((meal) => (
        <Card key={meal} meal={meal} savedRecipes={plan ? plan[meal] : []} />
      ))}
    </section>
  );
};

export default DayCard;
