export async function fetchAvailableMeals() {
  const response = await fetch("http://localhost:3000/meals");
  
  if (!response.ok) {
    throw new Error("Failed to fetch meals. Please try again later");
  }
  
  const resData = await response.json();
  return resData;
}
