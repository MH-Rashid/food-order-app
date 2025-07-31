import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  updateItem: () => {},
  resetCart: () => {},
});

function CartReducer(state, action) {
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

    localStorage.setItem('cart', JSON.stringify(updatedItems));

    return {
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

    localStorage.setItem('cart', JSON.stringify(updatedItems));

    return {
      items: updatedItems,
    };
  }

  if (action.type === "RESET_CART") {
    localStorage.setItem('cart', JSON.stringify([]));

    return {
      items: [],
    };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(CartReducer, {
    items: JSON.parse(localStorage.getItem('cart')) || [],
  });

  function addItem(item) {
    cartDispatch({
      type: "ADD_ITEM",
      item
    });
  }

  function updateItem(id, amount) {
    cartDispatch({
      type: "UPDATE_ITEM",
      id,
      amount
    });
  }

  function resetCart() {
    cartDispatch({
      type: "RESET_CART",
    });
  }

  const ctxValue = {
    items: cartState.items,
    addItem,
    updateItem,
    resetCart
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
