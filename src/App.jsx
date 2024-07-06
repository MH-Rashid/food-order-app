import CartContextProvider from "./store/meal-cart-context.jsx";
import meals from './available-meals.json';

import Header from "./components/Header";
import Meals from "./components/Meals";
import MealItem from "./components/MealItem.jsx";

export const orders = [];

function App() {
  const availableMeals = JSON.parse(JSON.stringify(meals));
  
  return (
    <CartContextProvider>
      <Header />
      <Meals>
        {availableMeals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
      </Meals>
    </CartContextProvider>
  );
}

export default App;
