import React from "react";
import styles from "./WelcomeNavigation.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../atoms/Logo/Logo";
import { motion } from "framer-motion";
import cx from "classnames";

const transition = { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] };

const WelcomeNavigation = () => {
  const location = useLocation();

  return (
    <motion.div
      exit={{ opacity: 1 }}
      transition={transition}
      className={styles.container}
    >
      <Logo custom={styles.logo} />
      <nav>
        <ul className={styles.nav}>
          <li className={styles.link}>
            <NavLink to="/signup">Join</NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="/login">Log in</NavLink>
          </li>
        </ul>
      </nav>
    </motion.div>
  );
};

export default WelcomeNavigation;
