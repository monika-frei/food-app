import React, { useState, useCallback, useMemo } from "react";
import styles from "./RecipeDetails.module.scss";
import imageBg from "../../../assets/2499038.jpg";
import Heading from "../../atoms/Heading/Heading";
import RecipeDetailsButtons from "../../molecules/RecipeDetailsButtons/RecipeDetailsButtons";
import ButtonIconSmall from "../../atoms/ButtonIconSmall/ButtonIconSmall";
import QuickAdd from "../../molecules/QuickAdd/QuickAdd";
import AddRecipe from "../../organisms/AddRecipe/AddRecipe";
import PopUpDelete from "../../molecules/PopUpDelete/PopUpDelete";
import PlanContextProvider from "../../../context/PlanContext";
import generatePdf from "../../../utils/generatePdf";
import arrayBufferToBase64 from "../../../utils/arrayBufferToBase64";

const RecipeDetails = ({
  recipe,
  toggle,
  classOpen,
  setOpenDelete,
  isOpenDelete,
  handleCloseDelete,
  handleDelete,
}) => {
  const [isOpenAdd, setOpenAdd] = useState(false);

  // recipe background img
  const buffer = recipe.recipeImage && recipe.recipeImage.img.data.data;
  const imageUrl = arrayBufferToBase64(buffer);
  const recipeImage = imageUrl
    ? `url(data:image/jpeg;base64,${imageUrl})`
    : `url(${imageBg})`;

  const handleOpenPopUpAddItem = useCallback(() => {
    setOpenAdd(!isOpenAdd);
  }, [isOpenAdd]);

  const handleOpenPopUpDeleteItem = useCallback(() => {
    setOpenDelete(!isOpenDelete);
  }, [isOpenDelete]);

  const options = useMemo(
    () => ({
      recipe,
      toggle,
      handleOpenPopUpAddItem,
      handleOpenPopUpDeleteItem,
    }),
    [recipe, isOpenDelete, isOpenAdd]
  );

  return (
    <article className={styles.container} id="content">
      <div
        className={styles.header}
        style={{
          backgroundImage: recipeImage,
        }}
      >
        <div className={styles.headerVisible}>
          <Heading custom={styles.heading}>{recipe.title}</Heading>
          <section className={styles.extraInfo}>
            {recipe.time !== "" && <p>Preparation time: {recipe.time}</p>}
            {recipe.servings !== "" && <p>Servings: {recipe.servings}</p>}
            <ul>
              Good for:
              {recipe.category.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
        <div
          style={{
            width: "100%",
            height: "25rem",
          }}
        ></div>
      </div>
      <ButtonIconSmall
        bgImage="buttonPrint"
        custom={styles.btnPrint}
        onClick={generatePdf}
      ></ButtonIconSmall>
      <section className={styles.recepie}>
        <section className={styles.ingredients}>
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((item) => (
              <li key={item.title}>
                {item.title}
                <span>
                  {item.amount}
                  {item.unit}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.preparationWrapper}>
          <h2>Preparation</h2>
          <ul>
            {recipe.preparation.map((item) => (
              <li>
                <em>Step {item.step}</em>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        </section>
        <div className={styles.horLine}></div>
        {recipe.info !== "" && (
          <section className={styles.addInfo}>
            <h2>Some additional info</h2>
            <p>{recipe.info}</p>
          </section>
        )}
        <RecipeDetailsButtons options={options} />
        {isOpenAdd && (
          <PlanContextProvider>
            <QuickAdd
              item={recipe}
              setOpen={setOpenAdd}
              custom={styles.quickAdd}
            />
          </PlanContextProvider>
        )}
        {classOpen === "activeForm" && (
          <AddRecipe
            classOpen={classOpen}
            toggle={toggle}
            recipeToEdit={recipe}
          />
        )}

        {isOpenDelete && (
          <PopUpDelete
            setOpen={handleCloseDelete}
            deleteItem={handleDelete}
            custom={styles.delete}
          />
        )}
      </section>
    </article>
  );
};

export default RecipeDetails;
