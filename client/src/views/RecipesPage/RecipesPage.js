import React, { useState, useContext, useMemo, useCallback } from "react";
import styles from "./RecipesPage.module.scss";
import PageTemplate from "../../templates/PageTemplate/PageTemplate";
import RecipesGrid from "../../components/organisms/RecipesGrid/RecipesGrid";
import ToggleOpen from "../../providers/ToggleOpen";
import QuickAdd from "../../components/molecules/QuickAdd/QuickAdd";
import AddRecipe from "../../components/organisms/AddRecipe/AddRecipe";
import PlanContextProvider from "../../context/PlanContext";
import { GlobalContext } from "../../context/GlobalContext";
import { Redirect } from "react-router";
import RecipesPageHeader from "../../components/organisms/RecipesPageHeader/RecipesPageHeader";

const RecipesPage = () => {
  const [selectedMeal, setSelectedMeal] = useState("all");
  const [classActiveBtn, setClassActiveBtn] = useState(true);
  const [inputContent, setInputContent] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState({});
  const [refresh, setRefresh] = useState(false);
  const { userLoggedIn } = useContext(GlobalContext);

  const handleInputChange = (e) => {
    setInputContent(e.target.value);
  };

  const handleSelectOption = useCallback((meal) => {
    setSelectedMeal(meal);
    setClassActiveBtn(true);
  }, []);

  const handleQuickAdd = useCallback(
    (item) => {
      setOpen(!isOpen);
      setActiveRecipe(item);
    },
    [isOpen]
  );

  const buttonsProps = useMemo(
    () => ({
      classActiveBtn,
      handleSelectOption,
      selectedMeal,
    }),
    [classActiveBtn, handleSelectOption, selectedMeal]
  );

  if (userLoggedIn === false) {
    return <Redirect to="/login" />;
  }

  return (
    <ToggleOpen
      render={({ toggle, classOpen }) => (
        <PageTemplate bgColorLight="bgPrimaryLight" border="borderPrimary">
          <div className={styles.wrapper}>
            <RecipesPageHeader
              toggle={toggle}
              buttonsProps={buttonsProps}
              inputContent={inputContent}
              handleInputChange={handleInputChange}
            />
            <RecipesGrid
              meal={selectedMeal}
              inputContent={inputContent.toLowerCase()}
              handleQuickAdd={handleQuickAdd}
              refresh
            />
          </div>
          {isOpen && (
            <PlanContextProvider>
              <QuickAdd
                item={activeRecipe}
                setOpen={setOpen}
                custom={styles.quickAdd}
              />
            </PlanContextProvider>
          )}
          {classOpen === "activeForm" && (
            <AddRecipe
              classOpen={classOpen}
              toggle={toggle}
              setRefresh={setRefresh}
            />
          )}
        </PageTemplate>
      )}
    />
  );
};

export default RecipesPage;
