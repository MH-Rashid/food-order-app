import mealsData from '../assets/available-meals.json'

export async function fetchAvailableMeals() {
//  const response = await fetch("https://arif-food-order-app.netlify.app/assets/available-meals.json");
  
//  if (!response.ok) {
//    throw new Error("Failed to fetch meals. Please try again later");
//  }
  
//  const resData = await response.json();
//  return resData;
  return mealsData;
}
