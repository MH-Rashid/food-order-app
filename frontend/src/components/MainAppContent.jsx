import { useContext } from "react";
import Header from "./Header.jsx";
import MealItem from "./MealItem.jsx";
import Meals from "./Meals.jsx";
import { AppContext } from "../store/meal-cart-context.jsx";

function MainAppContent() {
  const { meals } = useContext(AppContext);

  return (
    <>
      <Header />
      <Meals>
        {meals
          ? meals.map((meal) => <MealItem key={meal.id} meal={meal} />)
          : null}
      </Meals>
    </>
  );
}

export default MainAppContent;
