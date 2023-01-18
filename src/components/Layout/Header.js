import React from "react";

import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <h2>ReactMeals</h2>
        <button>Cart</button>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of deliciouis foods!" />
      </div>
    </>
  );
};

export default Header;
