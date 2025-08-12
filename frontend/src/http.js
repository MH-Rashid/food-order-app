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
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch("http://localhost:3100/api/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch orders. Please try again later");
  }

  const resData = await response.json();
  return resData;
}

export async function createOrder(orderData) {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch("http://localhost:3100/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(orderData),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to create order. Please try again later");
  }

  const resData = await response.json();
  return resData;
}

export async function deleteOrder(orderId) {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch("http://localhost:3100/api/orders", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      id: orderId
    }),
    credentials: "include",
  });

  const resData = await response.json();
  return resData;
}
