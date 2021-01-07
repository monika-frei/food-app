import React from "react";
import { withRouter } from "react-router";
import styles from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import Logo from "../../atoms/Logo/Logo";
import { motion } from "framer-motion";
import SidebarButton from "../../atoms/SidebarButton/SidebarButton";

const transition = { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] };

const Sidebar = ({ pageType }) => {
  const handleLogOut = () => {
    window.location.reload();
    return false;
  };

  return (
    <motion.div
      exit={{ opacity: 1 }}
      transition={transition}
      className={styles.container}
    >
      <nav className={styles.wrapper}>
        <Logo />
        <ul className={styles.nav}>
          <li className={styles.link}>
            <NavLink to="/plan">
              <SidebarButton
                border="borderSecondary"
                bgColor={pageType === "plan" && "bgSecondary"}
              >
                Plan
              </SidebarButton>
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="/recipes">
              <SidebarButton
                border="borderPrimary"
                bgColor={pageType === "recipes" && "bgPrimary"}
              >
                Recipes
              </SidebarButton>
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="/grocerylist">
              <SidebarButton
                border="borderTertiary"
                bgColor={pageType === "grocerylist" && "bgTertiary"}
              >
                Grocery List
              </SidebarButton>
            </NavLink>
          </li>
          <li className={styles.link}>
            <SidebarButton border="borderGrey" onClick={handleLogOut}>
              Log out
            </SidebarButton>
          </li>
        </ul>
      </nav>
    </motion.div>
  );
};

export default withRouter(Sidebar);
