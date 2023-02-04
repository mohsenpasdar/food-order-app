import React, { useState, useEffect } from "react";
import Card from "../UI/Card";

import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://completeguide-http-section14-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error('Failed to fetch!')
      }

      const data = await response.json();
      const loadedMeals = []
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          price: data[key].price,
          description: data[key].description
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    };
    fetchMeals().catch(error => {
      setIsLoading(false)
      setHttpError(error.message)
    })
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={classes.MealsLoading}>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section>
        <p className={classes.MealsError}>{httpError}</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      name={meal.name}
      description={meal.description}
      price={meal.price}
      id={meal.id}
      key={meal.id}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
