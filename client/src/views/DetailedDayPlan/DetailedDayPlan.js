import React, { useContext, useEffect, useState, useCallback } from "react";
import styles from "./DetailedDayPlan.module.scss";
import ToggleOpen from "../../providers/ToggleOpen";
import PageTemplate from "../../templates/PageTemplate/PageTemplate";
import DayPlanDetails from "./DayPlanDetails/DayPlanDetails";
import { PlanContext } from "../../context/PlanContext";
import { useHistory, useLocation, Redirect } from "react-router";
import AddPlan from "../../shared/AddPlan/AddPlan";
import PopUpDelete from "../../shared/PopUpDelete/PopUpDelete";
import QuickAdd from "../../shared/QuickAdd/QuickAdd";
import PlanContextProvider from "../../context/PlanContext";
import { GlobalContext } from "../../context/GlobalContext";

const border = "borderSecondary";
const bgColor = "bgSecondaryLight";

const DetailedDayPlan = () => {
  const {
    getPlanById,
    sendPlan,
    dayPlan,
    setPlanToEdit,
    planToEdit,
    deletePlan,
  } = useContext(PlanContext);
  const { userLoggedIn } = useContext(GlobalContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const history = useHistory();
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [isOpenQuickAdd, setOpenQuickAdd] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState({});
  const [refresh, setRefresh] = useState(false);

  const handleToggleDeletePopUp = useCallback(() => {
    setOpenDelete(!isOpenDelete);
  }, [isOpenDelete]);

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      getPlanById(id);
    }
    return () => {
      isCancelled = true;
    };
  }, [refresh, getPlanById, id]);

  const handleQuickAdd = useCallback(
    (item) => {
      setOpenQuickAdd(!isOpenQuickAdd);
      setActiveRecipe(item);
    },
    [isOpenQuickAdd]
  );

  const handleDeletePlan = useCallback(() => {
    deletePlan(id);
    setOpenDelete(!isOpenDelete);
    history.push("/plan");
  }, [isOpenDelete, deletePlan, history, id]);

  if (userLoggedIn === false) {
    return <Redirect to="/login" />;
  }

  return (
    <ToggleOpen
      render={({ toggle, classOpen }) => (
        <PageTemplate border={border} bgColorLight={bgColor}>
          <DayPlanDetails
            dayPlan={dayPlan}
            toggle={toggle}
            setPlanToEdit={setPlanToEdit}
            handleQuickAdd={handleQuickAdd}
            setOpenDelete={setOpenDelete}
            isOpenDelete={isOpenDelete}
          />
          {classOpen === "activeForm" && (
            <AddPlan
              toggle={toggle}
              classOpen={classOpen}
              planToEdit={planToEdit}
              setRefresh={setRefresh}
              sendPlan={sendPlan}
            />
          )}
          {isOpenQuickAdd && (
            <PlanContextProvider>
              <QuickAdd
                item={activeRecipe}
                setOpen={setOpenQuickAdd}
                custom={styles.quickAdd}
              />
            </PlanContextProvider>
          )}
          {isOpenDelete && (
            <PopUpDelete
              deleteItem={handleDeletePlan}
              setOpen={handleToggleDeletePopUp}
              custom={styles.delete}
            />
          )}
        </PageTemplate>
      )}
    />
  );
};

export default DetailedDayPlan;
