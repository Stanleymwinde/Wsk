import React, { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext({
  cartItems: [],
  addToCart: (item) => {},
  removeFromCart: (id) => {},
});

const CART_LOCAL_STORAGE_KEY = "cartItems";

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_CART":
      return {
        cartItems: action.payload,
      };

      case "ADD_TO_CART":
        const newItem = action.payload;
        const existingItemIndex = state.cartItems.findIndex(item => item.id === newItem.id);
      
        if (existingItemIndex !== -1) {
          const updatedCartItems = state.cartItems.map((item, index) => {
            if (index === existingItemIndex) {
              return {
                ...item,
                quantity: item.quantity + 1
              };
            } else {
              return item;
            }
          });
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      
          return {
            cartItems: updatedCartItems
          };
        } else {
          const updatedCartItems = [...state.cartItems, { ...newItem, quantity: 1 }];
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      
          return {
            cartItems: updatedCartItems
          };
        }
      
      
      
    case "REMOVE_FROM_CART":
       const updatedCartItemsAfterRemoval = state.cartItems.filter((item) => item.id !== action.payload);
      localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(updatedCartItemsAfterRemoval));
      return {
      cartItems: updatedCartItemsAfterRemoval,
    };

    case "CLEAR_CART":
      localStorage.removeItem(CART_LOCAL_STORAGE_KEY);
       return {
        cartItems: [],
     };

    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
  });
  useEffect(() => {
    const storedCartItems = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
    if (storedCartItems) {
      dispatch({ type: "INITIALIZE_CART", payload: JSON.parse(storedCartItems) });
    }
  }, []);

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };



  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        cartItems: state.cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
