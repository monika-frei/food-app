import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import { useFetchData } from "../hooks/index";

export const RecipesContext = createContext();

const RecipesContextProvider = (props) => {
  const [status, setStatus] = useState("LOADING");
  const [error, setError] = useState("");
  const [recipe, setRecipe] = useState({
    title: "",
    category: [],
    ingredients: [],
    preparation: [],
    time: "",
    servings: "",
    info: "",
    recipeImage: "",
  });
  const { token, getRecipes } = useContext(GlobalContext);
  const location = useLocation();
  const id = location ? location.pathname.split("/")[2] : "";

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const configPost = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const getSingleRecipe = async (id) => {
    axios
      .get(`https://fodd-app-server.herokuapp.com/recipes/${id}`, config)
      .then((res) => {
        console.log(res);
        setRecipe(res.data);
      })
      .catch((err) => {
        console.log(`Something went wrong ${err}`);
        setError(err.response.status);
      });
  };

  const createRecipe = (formData) => {
    axios
      .post(
        "https://fodd-app-server.herokuapp.com/recipes",
        formData,
        configPost
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`Something went wrong ${err}`);
      });
  };

  const updateRecipe = (formData) => {
    axios
      .patch(
        `https://fodd-app-server.herokuapp.com/recipes/${id}`,
        formData,
        config
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`Something went wrong ${err}`);
      });
  };

  const sendRecipe = (formData) => {
    if (id) {
      updateRecipe(formData);
      console.log(id);
    } else {
      console.log(id);
      createRecipe(formData);
    }
  };

  const deleteRecipe = () => {
    if (id !== "") {
      axios
        .delete(`https://fodd-app-server.herokuapp.com/recipes/${id}`, config)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <RecipesContext.Provider
      value={{
        status,
        getSingleRecipe,
        recipe,
        createRecipe,
        sendRecipe,
        deleteRecipe,
        error,
        setError,
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesContextProvider;
