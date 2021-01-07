import React, { useContext } from "react";
import { useViewport } from "../../../hooks/index";
import { motion } from "framer-motion";
import HamburgerMenu from "../../organisms/HamburgerMenu/HamburgerMenu";
import WelcomeNavigation from "../WelcomeNavigation/WelcomeNavigation";
import Sidebar from "../Sidebar/Sidebar";
import { GlobalContext } from "../../../context/GlobalContext";

const transition = { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] };

const Header = ({ pageType }) => {
  const { width } = useViewport();
  const breakpoint = 1260;
  const menuItemsLogged = ["Plan", "Recipes", "Grocery List", "Log Out"];
  const menuItems = ["Log in", "Sign up"];
  const { userLoggedIn } = useContext(GlobalContext);

  return (
    <div>
      {width < breakpoint && userLoggedIn && (
        <HamburgerMenu menuItems={menuItemsLogged} />
      )}
      {width >= breakpoint && userLoggedIn && <Sidebar pageType={pageType} />}
      {width < breakpoint && !userLoggedIn && (
        <HamburgerMenu menuItems={menuItems} />
      )}
      {width >= breakpoint && !userLoggedIn && <WelcomeNavigation />}
    </div>
  );
};

export default Header;
