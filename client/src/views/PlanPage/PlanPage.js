import React, { useContext } from "react";
import PageTemplate from "../../templates/PageTemplate/PageTemplate";
import WeekPlan from "./WeekPlan/WeekPlan";
import styles from "./PlanPage.module.scss";
import AddPlan from "../../shared/AddPlan/AddPlan";
import ButtonIcon from "../../shared/ButtonIcon/ButtonIcon";
import ToggleOpen from "../../providers/ToggleOpen";
import { PlanContext } from "../../context/PlanContext";
import { GlobalContext } from "../../context/GlobalContext";
import { Redirect } from "react-router";

const PlanPage = () => {
  const { sendPlan, planToEdit } = useContext(PlanContext);
  const { userLoggedIn } = useContext(GlobalContext);

  if (userLoggedIn === false) {
    return <Redirect to="/login" />;
  }

  return (
    <ToggleOpen
      render={({ toggle, classOpen }) => (
        <PageTemplate border="borderSecondary">
          <div className={styles.wrapper}>
            <WeekPlan toggle={toggle} />
            <div className={styles.buttonWrapper}>
              <ButtonIcon
                bgColor="bgSecondary"
                custom={styles.button}
                onClick={toggle}
              />
            </div>
          </div>
          {classOpen === "activeForm" && (
            <AddPlan
              toggle={toggle}
              classOpen={classOpen}
              planToEdit={planToEdit}
              sendPlan={sendPlan}
            />
          )}
        </PageTemplate>
      )}
    />
  );
};

export default PlanPage;
