export async function fetchAvailableMeals() {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch("http://localhost:3100/api/meals", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch meals. Please try again later");
  }

  const resData = await response.json();

  return resData;
}

export async function fetchOrders() {
  const response = await fetch("http://localhost:3100/api/orders", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch orders. Please try again later");
  }

  const resData = await response.json();
  return resData;
}
