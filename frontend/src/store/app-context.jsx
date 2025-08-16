import { createContext, useReducer, useEffect } from "react";
import { fetchAvailableMeals } from "../http.js";
import { toast } from "react-toastify";

export const AppContext = createContext({
  user: {
    accessToken: "",
    firstname: "",
    lastname: "",
    username: "",
  },
  items: [],
  meals: [],
  setMeals: () => {},
  setUser: () => {},
  addItem: () => {},
  addItems: () => {},
  updateItem: () => {},
  resetCart: () => {},
});

function AppReducer(state, action) {
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: {
        accessToken: action.payload.accessToken,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        username: action.payload.username,
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

  if (action.type === "ADD_ITEMS") {
    const updatedItems = [...state.items];

    action.items.forEach((newItem) => {
      const existingIndex = updatedItems.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingIndex !== -1) {
        const existingItem = updatedItems[existingIndex];
        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + newItem.quantity,
        };
      } else {
        updatedItems.push({ ...newItem });
      }
    });

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
  const accessToken = localStorage.getItem("accessToken") || "";
  const userData = JSON.parse(localStorage.getItem("user")) || {};
  const [initialState, dispatch] = useReducer(AppReducer, {
    user: {
      accessToken: accessToken,
      firstname: userData.firstname || "",
      lastname: userData.lastname || "",
      username: userData.username || "",
    },
    meals: [],
    items: JSON.parse(localStorage.getItem("cart")) || [],
  });

  function setUser(payload) {
    dispatch({
      type: "SET_USER",
      payload,
    });
  }

  function setMeals(payload) {
    dispatch({
      type: "SET_MEALS",
      payload,
    });
  }

  function addItem(item) {
    dispatch({
      type: "ADD_ITEM",
      item,
    });
  }

  function addItems(items) {
    dispatch({
      type: "ADD_ITEMS",
      items,
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

  // Fetch meals after mount if accessToken exists
  useEffect(() => {
    async function fetchMeals() {
      if (!accessToken) return;
      const response = await fetchAvailableMeals();
      if (Array.isArray(response)) {
        setMeals(response);
      } else {
        toast.error(response.message || "Failed to fetch meals.");
      }
    }
    
    fetchMeals();
  }, [accessToken]);

  const ctxValue = {
    user: initialState.user,
    items: initialState.items,
    meals: initialState.meals,
    setMeals,
    setUser,
    addItem,
    addItems,
    updateItem,
    resetCart,
  };

  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
}
