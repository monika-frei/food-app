import React from "react";
import styles from "./WelcomeNavigation.module.scss";
import { NavLink } from "react-router-dom";
import Logo from "../../../shared/Logo/Logo";
import { motion } from "framer-motion";

const transition = { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] };

const WelcomeNavigation = () => {
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
