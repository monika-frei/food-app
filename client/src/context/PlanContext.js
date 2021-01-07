import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import moment from "moment";

export const PlanContext = createContext();

const PlanContextProvider = (props) => {
  const { plan, getPlan } = useContext(GlobalContext);
  const [dayPlan, setDayPlan] = useState({
    day: "",
    date: "",
    plan: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    },
  });
  const [planToEdit, setPlanToEdit] = useState({
    day: "",
    date: "",
    plan: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    },
  });
  const { token, userId } = useContext(GlobalContext);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getPlanById = (id) => {
    axios
      .get(`https://fodd-app-server.herokuapp.com/plan/${id}`, config)
      .then((res) => {
        setDayPlan(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const savePlan = (date, day, savedRecipes) => {
    const dayPlan = {
      day,
      date,
      recipes: savedRecipes,
    };
    axios
      .post("https://fodd-app-server.herokuapp.com/plan", dayPlan, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePlan = (planId) => {
    axios
      .delete(`https://fodd-app-server.herokuapp.com/plan/${planId}`, config)
      .then((res) => {
        console.log(res);
        getPlan();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePlan = (planId, planToUpdate) => {
    axios
      .patch(
        `https://fodd-app-server.herokuapp.com/plan/${planId}`,
        planToUpdate,
        config
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addRecipeToPlan = (date, meal, recipe) => {
    const formatDate = moment(date).format("YYYY-MM-DD");
    if (plan.filter((item) => item.date === formatDate).length === 0) {
      let savedRecipes = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
      };
      savedRecipes[meal] = [...savedRecipes[meal], recipe];
      const day = moment(date).format("dddd");

      savePlan(formatDate, day, savedRecipes);
    } else {
      const [planToUpdate] = plan.filter((item) => {
        if (item.date === formatDate) {
          return item;
        } else {
          return {};
        }
      });
      const checkRepetition = planToUpdate.plan[meal].filter((item) => {
        if (item._id === recipe._id) {
          return item;
        } else {
          return [];
        }
      });
      if (planToUpdate && checkRepetition.length === 0) {
        planToUpdate.plan[meal] = [...planToUpdate.plan[meal], recipe];
        updatePlan(planToUpdate._id, planToUpdate);
      }
    }
  };
  const sendPlan = (date, day, savedRecipes) => {
    if (plan.filter((item) => item.date === date).length === 0) {
      savePlan(date, day, savedRecipes);
    } else {
      const [planInDb] = plan.filter((item) => {
        if (item.date === date) {
          return item;
        }
      });
      const planToUpdate = {
        date,
        day,
        plan: savedRecipes,
      };
      if (planToUpdate) {
        updatePlan(planInDb._id, planToUpdate);
      }
    }
  };

  return (
    <PlanContext.Provider
      value={{
        getPlanById,
        savePlan,
        sendPlan,
        deletePlan,
        dayPlan,
        planToEdit,
        setPlanToEdit,
        updatePlan,
        addRecipeToPlan,
        setDayPlan,
      }}
    >
      {props.children}
    </PlanContext.Provider>
  );
};

export default PlanContextProvider;
