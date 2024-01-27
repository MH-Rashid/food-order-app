import CartContextProvider from "./store/meal-cart-context.jsx";

import Header from "./components/Header";
import Meals from "./components/Meals";
import MealItem from "./components/MealItem.jsx";
import ErrorMessage from "./components/Cart/ErrorMessage.jsx";

import { fetchAvailableMeals } from "./http.js";
import { useFetch } from "./hooks/useFetch.jsx";

function App() {
  const {
    fetchedData: fetchedMeals,
    isFetching,
    error,
  } = useFetch(fetchAvailableMeals, []);

  return (
    <CartContextProvider>
      <Header />
      <Meals>
        {error && (
          <ErrorMessage title="An error occurred!" message={error.message} />
        )}
        {!error && isFetching && (
          <p className="fallback-text">Fetching available meals...</p>
        )}
        {!error &&
          !isFetching &&
          fetchedMeals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
      </Meals>
    </CartContextProvider>
  );
}

export default App;
