import React from "react";
import { useSubLoad } from "../../../hooks/index";
import RecipeCard from "../../../shared/RecipeCard/RecipeCard";
import LoadingSpinner from "../../../shared/LoadingSpinner/LoadingSpinner";

const SubLoad = ({ containerSelector, itemId, item, handleQuickAdd }) => {
  const [loaded, elRef] = useSubLoad(containerSelector, true);

  return (
    <div className={"sub-load"} ref={elRef}>
      {loaded ? (
        <RecipeCard
          itemId={itemId}
          item={item}
          bgColor="bgPrimary"
          handleQuickAdd={handleQuickAdd}
        />
      ) : (
        <div style={{ width: 200, height: 450 }}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default SubLoad;
