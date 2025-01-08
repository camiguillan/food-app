import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCarItem = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingCarItem > -1) {
      const existingItem = state.items[existingCarItem];
      // console.log("item present", existingItem);
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCarItem] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    // console.log("adding item...", updatedItems);
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCarItem = state.items.findIndex(
      (item) => item.id === action.id
    );

    const item = state.items[existingCarItem];

    const updatedItems = [...state.items];

    if (item.quantity === 1) {
      updatedItems.splice(existingCarItem, 1);
    } else {
      const updatedItem = { item, quantity: item.quantity - 1 };
      updatedItems[existingCarItem] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if ((action.type = "CLEAR-CART")) {
    return { ...state, items: [] };
  }

  return state;
}

export function CartProvider({ children }) {
  const [cart, dispatchCart] = useReducer(cartReducer, {
    items: [],
  });

  function addItem(item) {
    dispatchCart({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    dispatchCart({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispatchCart({ type: "CLEAR-CART" });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
