import { createContext, useReducer } from "react";
import { fetchAvailableMeals } from "../http.js";

export const AppContext = createContext({
  user: {
    username: "",
    orders: "",
  },
  items: [],
  meals: [],
  setMeals: () => {},
  setUser: () => {},
  addItem: () => {},
  updateItem: () => {},
  resetCart: () => {},
});

function AppReducer(state, action) {
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: {
        username: action.username,
        orders: action.orders,
      },
    };
  }

  if (action.type === "SET_MEALS") {
    return {
      ...state,
      meals: action.payload,
    };
  }

  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.item.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        id: action.item.id,
        name: action.item.name,
        price: action.item.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(updatedItems));

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.id
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    localStorage.setItem("cart", JSON.stringify(updatedItems));

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "RESET_CART") {
    localStorage.setItem("cart", JSON.stringify([]));

    return {
      ...state,
      items: [],
    };
  }

  return state;
}

export default function AppContextProvider({ children }) {
  const [initialState, dispatch] = useReducer(AppReducer, {
    user: {
      username: "",
      orders: "",
    },
    meals: [],
    items: JSON.parse(localStorage.getItem("cart")) || [],
  });

  function setUser(username, orders) {
    dispatch({
      type: "SET_USER",
      username,
      orders,
    });
  }

  async function setMeals() {
  try {
    const meals = await fetchAvailableMeals();
    dispatch({
      type: "SET_MEALS",
      payload: meals,
    });
  } catch (err) {
    console.error("Failed to load meals");
  }
}

  function addItem(item) {
    dispatch({
      type: "ADD_ITEM",
      item,
    });
  }

  function updateItem(id, amount) {
    dispatch({
      type: "UPDATE_ITEM",
      id,
      amount,
    });
  }

  function resetCart() {
    dispatch({
      type: "RESET_CART",
    });
  }

  const ctxValue = {
    user: initialState.user,
    items: initialState.items,
    meals: initialState.meals,
    setMeals,
    setUser,
    addItem,
    updateItem,
    resetCart,
  };

  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
}
