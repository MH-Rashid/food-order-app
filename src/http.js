export async function fetchAvailableMeals() {
  const response = await fetch("http://localhost:3000/meals");
  
  if (!response.ok) {
    throw new Error("Failed to fetch meals. Please try again later");
  }
  
  const resData = await response.json();
  return resData;
}

export async function fetchOrders() {
  try {
    const response = await fetch("http://localhost:3000/orders");

    // if (!response.ok) {
    //   throw new Error("Failed to fetch orders. Please try again later");
    // }

    const resData = await response.json();
    return resData;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
  }
}
