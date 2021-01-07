import React, { useState } from "react";
import styles from "./HamburgerMenu.module.scss";
import Logo from "../../atoms/Logo/Logo";
import HamburgerButton from "../../atoms/HamburgerButton/HamburgerButton";
import { NavLink } from "react-router-dom";

const HamburgerMenu = ({ menuItems }) => {
  const [open, setOpen] = useState(false);
  const handleLogOut = () => {
    window.location.reload();
    return false;
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const handleLinkClick = () => {
    setOpen(!open);
  };
  const stylesOpenMenu = {
    height: open ? "100%" : 0,
  };
  return (
    <div>
      <div className={styles.wrapper}>
        <HamburgerButton handleClick={handleClick} open={open} />
        <Logo custom={styles.logo} />
      </div>
      <div className={styles.container} style={stylesOpenMenu}>
        {open &&
          menuItems.map((item, index) => {
            return (
              <div className={styles.menuList} key={index}>
                <div
                  className={styles.itemWrapper}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item === "Log Out" && (
                    <>
                      <div
                        className={styles.menuItem}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={handleLogOut}
                      >
                        {item}
                      </div>
                      <div
                        className={styles.line}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      />
                    </>
                  )}
                  {item !== "Log Out" && (
                    <>
                      <NavLink to={`/${item.replace(" ", "").toLowerCase()}`}>
                        <div
                          className={styles.menuItem}
                          style={{ animationDelay: `${index * 0.1}s` }}
                          onClick={() => handleLinkClick()}
                        >
                          {item}
                        </div>
                      </NavLink>
                      <div
                        className={styles.line}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      />
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HamburgerMenu;
