import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { RecipesContext } from "../../../context/RecipesContext";
import AddRecipeForm from "../AddRecipeForm/AddRecipeForm";

const AddRecipe = (props) => {
  const { sendRecipe } = useContext(RecipesContext);
  const { plan } = useContext(GlobalContext);
  const [step, setStep] = useState(1);
  const [editStep, setEditStep] = useState(null);
  const [content, setContent] = useState("");
  const [editContent, setEditContent] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [servings, setServings] = useState("");
  const [addInfo, setAddInfo] = useState("");
  const [meals, setMeals] = useState([]);
  const [ingredientTitle, setIngredientTitle] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("-");
  const [ingredients, setIngredients] = useState([]);
  const [preparation, setPreparation] = useState([]);
  const [file, setFile] = useState("");
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningField, setWarningField] = useState("");
  const { classOpen, toggle, recipeToEdit } = props;

  useEffect(() => {
    if (recipeToEdit) {
      setTitle(recipeToEdit.title);
      setTime(recipeToEdit.time);
      setServings(recipeToEdit.servings);
      setAddInfo(recipeToEdit.info);
      setMeals(recipeToEdit.category);
      setIngredients(recipeToEdit.ingredients);
      setPreparation(recipeToEdit.preparation);
    }
  }, [recipeToEdit]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleStepChange = (e) => {
    setStep(Math.floor(parseInt(e.target.value)));
  };

  const handleInputMeals = (e) => {
    const target = e.target;
    const value = target.checked;
    const name = target.name;
    if (value) {
      setMeals((meals) => [...meals, name]);
    } else {
      const filteredMeals = meals.filter((meal) => !meal.includes(name));
      setMeals(filteredMeals);
    }
  };

  const handleAddIngredient = () => {
    const id = Math.floor(Math.random() * 1000);
    const ingredient = {
      id,
      title: ingredientTitle,
      amount: ingredientAmount,
      unit: ingredientUnit,
    };
    setIngredients((ingredients) => [...ingredients, ingredient]);
  };
  const handleDeleteIngredient = (item) => {
    const filteredIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== item.id
    );
    setIngredients(filteredIngredients);
  };

  const handleAddPrepStep = () => {
    let addStep;
    if (editStep) {
      addStep = {
        step: editStep,
        content,
      };
    } else {
      addStep = {
        step,
        content,
      };
    }

    const filteredPreparation = preparation.filter((item) => {
      return item.step !== editStep && item.step !== step;
    });
    const actualStep = editStep && step;

    setPreparation(() => [...filteredPreparation, addStep]);
    if (actualStep) {
      setStep(actualStep);
    } else {
      setStep((step) => step + 1);
    }
    setContent("");
    setEditContent("");
    setEditStep(null);
  };
  const handleDeletePrepStep = (step) => {
    const filteredPreparation = preparation.filter(
      (item) => item.step !== step.step
    );
    setPreparation(filteredPreparation);
  };

  const handleEditPrepStep = (item) => {
    setEditStep(item.step);
    setContent(item.content);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      setWarningOpen(true);
      setWarningField("title");
    } else if (meals.length === 0) {
      setWarningOpen(true);
      setWarningField("category");
    } else if (ingredients.length === 0) {
      setWarningOpen(true);
      setWarningField("ingredients");
    } else if (preparation.length === 0) {
      setWarningOpen(true);
      setWarningField("preparation");
    } else if (file === "") {
      setWarningOpen(true);
      setWarningField("file");
    } else {
      const obj = {
        category: meals,
        title: title.toLowerCase(),
        ingredients,
        preparation,
        time,
        servings,
        info: addInfo,
      };
      const json = JSON.stringify(obj);

      const formData = new FormData();
      formData.append("document", json);
      if (file !== "") {
        formData.append("file", file);
      }
      sendRecipe(formData);
      toggle();
    }
  };
  console.log(plan);
  return (
    <AddRecipeForm
      classOpen={classOpen}
      toggle={toggle}
      title={title}
      setTitle={setTitle}
      meals={meals}
      setMeals={setMeals}
      ingredientTitle={ingredientTitle}
      setIngredientTitle={setIngredientTitle}
      ingredientAmount={ingredientAmount}
      setIngredientAmount={setIngredientAmount}
      ingredientUnit={ingredientUnit}
      setIngredientUnit={setIngredientUnit}
      time={time}
      setTime={setTime}
      servings={servings}
      setServings={setServings}
      addInfo={addInfo}
      setAddInfo={setAddInfo}
      editStep={editStep}
      step={step}
      content={content}
      editContent={editContent}
      setContent={setContent}
      ingredients={ingredients}
      preparation={preparation}
      handleInputMeals={handleInputMeals}
      handleAddIngredient={handleAddIngredient}
      handleFileUpload={handleFileUpload}
      handleDeleteIngredient={handleDeleteIngredient}
      handleStepChange={handleStepChange}
      handleAddPrepStep={handleAddPrepStep}
      handleEditPrepStep={handleEditPrepStep}
      handleDeletePrepStep={handleDeletePrepStep}
      handleSubmit={handleSubmit}
      warningOpen={warningOpen}
      setWarningOpen={setWarningOpen}
      warningField={warningField}
      setWarningField={setWarningOpen}
      {...props}
    />
  );
};

export default AddRecipe;
