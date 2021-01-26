/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import styles from "./RecipePage.module.scss";
import PageTemplate from "../../templates/PageTemplate/PageTemplate";
import RecipeDetails from "./RecipeDetails/RecipeDetails";
import ToggleOpen from "../../providers/ToggleOpen";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import PopUpInfo from "../../shared/PopUpInfo/PopUpInfo";
import { routes } from "../../utilities/routes/index";
import { RecipesContext } from "../../context/RecipesContext";
import { useLocation, useHistory, Redirect } from "react-router";
import { GlobalContext } from "../../context/GlobalContext";

const RecipePage = () => {
  const [loading, setLoading] = useState(true);
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const history = useHistory();

  const { userLoggedIn } = useContext(GlobalContext);
  const { getSingleRecipe, recipe, deleteRecipe, error } = useContext(
    RecipesContext
  );

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      getSingleRecipe(id);
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (recipe.title !== "") {
      setLoading(false);
    }
  }, [recipe]);

  useEffect(() => {
    if (error === 404) {
      setIsPopUp(true);
    }
  }, [error]);

  const handleCloseDelete = () => {
    setOpenDelete(!isOpenDelete);
  };
  const handleDelete = () => {
    deleteRecipe(id);
    setOpenDelete(!isOpenDelete);
    history.push(`${routes.recipes}`);
  };

  const onClickPopUp = () => {
    setIsPopUp(!isPopUp);
    history.push("/recipes");
  };

  if (userLoggedIn === false) {
    return <Redirect to="/login" />;
  }

  return (
    <ToggleOpen
      render={({ toggle, classOpen }) => (
        <PageTemplate border="borderPrimary" bgColorLight="bgPrimaryLight">
          {loading && (
            <section className={styles.container}>
              <LoadingSpinner />
            </section>
          )}
          {isPopUp && (
            <section className={styles.container}>
              <PopUpInfo
                text="Recipe no longer exists"
                onClick={onClickPopUp}
              />
            </section>
          )}
          {loading === false && (
            <RecipeDetails
              recipe={recipe}
              toggle={toggle}
              classOpen={classOpen}
              handleCloseDelete={handleCloseDelete}
              handleDelete={handleDelete}
              setOpenDelete={setOpenDelete}
              isOpenDelete={isOpenDelete}
            />
          )}
        </PageTemplate>
      )}
    />
  );
};

export default RecipePage;
