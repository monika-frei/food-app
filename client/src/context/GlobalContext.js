import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import { useAuthUser, useFetchData } from "../hooks";

export const GlobalContext = createContext();

const planUrl = "https://fodd-app-server.herokuapp.com/plan";
const recipesUrl = "https://fodd-app-server.herokuapp.com/recipes";

const GlobalContextProvider = (props) => {
  const [plan, setPlan] = useState([]);
  const [plannedRecipes, setPlannedRecipes] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const [authState, doAuth] = useAuthUser("", { email: "", password: "" });
  const [planState, doFetchPlan] = useFetchData({
    url: "",
    token: "",
  });
  const [recipesState, doFetchRecipes] = useFetchData({
    url: recipesUrl,
    token: authState?.data?.token,
  });

  const handleLogIn = (e, email, password) => {
    e.preventDefault();
    doAuth({
      url: "https://fodd-app-server.herokuapp.com/user/login",
      userData: {
        email,
        password,
      },
    });
  };

  const handleSignUp = (e, email, password) => {
    e.preventDefault();
    doAuth({
      url: "https://fodd-app-server.herokuapp.com/user/signup",
      userData: {
        email,
        password,
      },
    });
  };

  const handleLogOut = (e, email, password) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
    };
    axios
      .post("https://fodd-app-server.herokuapp.com/user/logout", newUser)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    doFetchPlan({
      url: planUrl,
      token: authState?.data?.token,
    });
  }, [authState.data.token]);

  const getPlan = () => {
    doFetchPlan({
      url: planUrl,
      token: authState?.data?.token,
    });
  };

  const getRecipes = () => {
    doFetchRecipes({
      url: planUrl,
      token: authState?.data?.token,
    });
  };

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");
    const updatedPlan = planState.data?.plan?.filter((dayPlan) => {
      if (
        moment(dayPlan.date).isAfter(today) ||
        moment(dayPlan.date).isSame(today)
      ) {
        return dayPlan;
      } else {
        return null;
      }
    });
    if (planState.data.plan) {
      setPlan(updatedPlan);
    }
  }, [planState.data.plan]);

  useEffect(() => {
    console.log("pobieranie");
    doFetchRecipes({
      url: recipesUrl,
      token: authState?.data?.token,
    });
  }, [authState.data.token]);

  useEffect(() => {
    let allRecipes = [];
    plan.length !== 0 &&
      plan.map((item) => {
        if (item.recipes && item.recipes.length !== 0) {
          return (allRecipes = [...allRecipes, ...item.recipes]);
        } else {
          return allRecipes;
        }
      });
    let plannedRecipes = [];
    allRecipes.map((recipe, index, array) => {
      const count = array.filter((item) => item === recipe).length;
      const newItem = {
        count,
        recipeId: recipe,
      };
      if (
        plannedRecipes.find((item) => item.recipeId === recipe) === undefined
      ) {
        return (plannedRecipes = [...plannedRecipes, newItem]);
      } else {
        return null;
      }
    });
    setPlannedRecipes(plannedRecipes);
  }, [plan]);

  useEffect(() => {
    if (
      authState.data.token &&
      recipesState.data.recipes &&
      planState.data.plan
    ) {
      setUserLoggedIn(true);
    }
  }, [recipesState.data.recipes, planState.data.plan]);

  return (
    <GlobalContext.Provider
      value={{
        userLoggedIn,
        token: authState.data.token,
        userId: authState.data.userId,
        authMessage: authState.data.message,
        plan,
        setPlan,
        plannedRecipes,
        recipes: recipesState.data.recipes,
        authLoading: authState.isLoading,
        recipesLoading: recipesState.isLoading,
        planLoading: planState.isLoading,
        handleSignUp,
        handleLogIn,
        handleLogOut,
        getPlan,
        getRecipes,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
