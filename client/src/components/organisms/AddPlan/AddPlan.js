import React, { useEffect, useState, useCallback, useContext } from "react";
import AddPlanForm from "../AddPlanForm/AddPlanForm";
import PopupRecipes from "../../molecules/PopupRecipes/PopupRecipes";
import momentAdapter from "../../../utils/moment";
import { GlobalContext } from "../../../context/GlobalContext";

const AddPlan = (props) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [savedRecipes, setSavedRecipes] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });
  const [meal, setMeal] = useState("");
  const { classOpen, sendPlan, planToEdit, toggle } = props;
  const { getPlan } = useContext(GlobalContext);

  useEffect(() => {
    if (classOpen === "") {
      setDate("");
      setSavedRecipes({
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
      });
    }
  }, [classOpen]);

  useEffect(() => {
    setDate(planToEdit.date);
    setSavedRecipes(planToEdit.plan);
  }, [planToEdit]);

  // onClick button - add recipe to meal card
  const handleAddRecipe = (meal) => {
    setMeal(meal);
    setOpen(true);
  };

  //function which saves chosen recipe from the list in state
  const handleSaveRecipe = (recipe) => {
    if (
      savedRecipes[meal].find((item) => item._id === recipe._id) === undefined
    ) {
      const newPlanItem = {
        _id: recipe._id,
        title: recipe.title,
      };
      const newArray = [...savedRecipes[meal], newPlanItem];
      setSavedRecipes({ ...savedRecipes, ...{ [meal]: newArray } });
    }
  };

  // onClick button - delete recipe from meal card
  const handleDeleteRecipe = useCallback(
    (meal, recipe) => {
      const filteredRecipes = savedRecipes[meal].filter(
        (item) => item._id !== recipe._id
      );
      setSavedRecipes({ ...savedRecipes, ...{ [meal]: filteredRecipes } });
    },
    [savedRecipes]
  );

  //send plan to db
  const handleSubmit = (e) => {
    e.preventDefault();
    setDate("");
    setSavedRecipes({
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    });
    const day = momentAdapter(date, "dddd").formatDate;
    const formatDate = momentAdapter(date, "YYYY-MM-DD").formatDate;
    sendPlan(formatDate, day, savedRecipes);
    toggle();
    // getPlan();
  };

  //closing pop-up recipes
  const handleClosePopUp = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <>
      <AddPlanForm
        date={date}
        setDate={setDate}
        open={open}
        setOpen={setOpen}
        meal={meal}
        savedRecipes={savedRecipes}
        handleAddRecipe={handleAddRecipe}
        handleDeleteRecipe={handleDeleteRecipe}
        handleSaveRecipe={handleSaveRecipe}
        handleClosePopUp={handleClosePopUp}
        handleSubmit={handleSubmit}
        {...props}
      />
      {open && (
        <PopupRecipes
          handleSaveRecipe={handleSaveRecipe}
          handleClose={handleClosePopUp}
        />
      )}
    </>
  );
};

export default AddPlan;
