import React, { useState } from "react";
import styles from "./WelcomePage.module.scss";
import cx from "classnames";
import WelcomeTemplate from "../../templates/WelcomeTemplate/WelcomeTemplate";
import Heading from "../../components/atoms/Heading/Heading";
import Paragraph from "../../components/atoms/Paragraph/Paragraph";
import Button from "../../components/atoms/Button/Button";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import { AnimatePresence, motion } from "framer-motion";

const WelcomePage = () => {
  const [isOpenPage, setOpenPage] = useState(false);
  const imageClass = cx(styles.image, { [styles.imageOpen]: isOpenPage });
  const containerClass = cx(styles.container, {
    [styles.containerOpen]: isOpenPage,
  });
  const wrapperClass = cx(styles.wrapper, { [styles.wrapperOpen]: isOpenPage });

  return (
    <WelcomeTemplate>
      <section className={containerClass}>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={wrapperClass}
          >
            <Heading custom={styles.heading}>
              Easy way to
              <br />
              stay healthy
            </Heading>
            <Paragraph custom={styles.paragraph}>
              Plan your meals, create cooking
              <br />
              book and more
            </Paragraph>
            <Link to={routes.signup}>
              <Button
                bgColor="bgPrimaryDark"
                custom={styles.button}
                onClick={() => setOpenPage(!isOpenPage)}
              >
                Start now
              </Button>
            </Link>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, type: "tween" }}
            exit={{ x: "100vw" }}
            className={imageClass}
          ></motion.div>
        </AnimatePresence>
      </section>
    </WelcomeTemplate>
  );
};

export default WelcomePage;
