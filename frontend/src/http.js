export async function fetchAvailableMeals() {
  const response = await fetch("https://localhost:3000/meals", {
    method: "GET",
    mode: "no-cors",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch meals. Please try again later");
  }

  const resData = await response.json();
  return resData;
}

export async function fetchOrders() {
  const response = await fetch("https://localhost:3000/orders", {
    method: "GET",
    mode: "no-cors",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch orders. Please try again later");
  }

  const resData = await response.json();
  return resData;
}
