import '../styles/meals.css';
import { useContext, useState } from "react";
import { AppContext } from '../store/app-context.jsx';
import Button from './Button.jsx';

export default function MealItem({ meal }) {
  const { addItem } = useContext(AppContext);
  const [isAdded, setIsAdded] = useState(false);

  function addMealItem() {
    addItem(meal);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={meal.image} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{`$${meal.price}`}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button
            styling={isAdded ? "orange-button-clicked" : "orange-button"}
            clickFn={addMealItem}
            btnText={isAdded ? "Added" : "Add to Cart"}
          />
        </p>
      </article>
    </li>
  );
}
