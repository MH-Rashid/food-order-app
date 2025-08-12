async function tryRefreshToken() {
  console.log("Attempting to refresh token...");
  
  try {
    const res = await fetch("http://localhost:3100/api/refresh", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (err) {
    console.error("Refresh error:", err);
    return null;
  }
}

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

  if (response.status === 401) {
    const newAccessToken = await tryRefreshToken();
    if (newAccessToken) {
      // Retry the original request with the new access token
      const retryResponse = await fetch("http://localhost:3100/api/meals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
        credentials: "include",
      });

      const retryData = await retryResponse.json();
      return retryData;
    }
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

  if (response.status === 401) {
    const newAccessToken = await tryRefreshToken();
    if (newAccessToken) {
      // Retry the original request with the new access token
      const retryResponse = await fetch("http://localhost:3100/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
        credentials: "include",
      });

      const retryData = await retryResponse.json();
      return retryData;
    }
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

  if (response.status === 401) {
    const newAccessToken = await tryRefreshToken();
    if (newAccessToken) {
      // Retry the original request with the new access token
      const retryResponse = await fetch("http://localhost:3100/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
        body: JSON.stringify(orderData),
        credentials: "include",
      });

      const retryData = await retryResponse.json();
      return retryData;
    }
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
      id: orderId,
    }),
    credentials: "include",
  });

  if (response.status === 401) {
    const newAccessToken = await tryRefreshToken();
    if (newAccessToken) {
      // Retry the original request with the new access token
      const retryResponse = await fetch("http://localhost:3100/api/orders", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
        body: JSON.stringify({
          id: orderId,
        }),
        credentials: "include",
      });

      const retryData = await retryResponse.json();
      return retryData;
    }
  }

  const resData = await response.json();
  return resData;
}
