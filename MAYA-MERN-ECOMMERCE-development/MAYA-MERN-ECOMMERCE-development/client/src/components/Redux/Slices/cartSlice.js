import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [], // each item = { product, quantity }
  },
  reducers: {
    addItem: (state, action) => {
        const { product, quantity } = action.payload;

        const isItemExisted = state.cartItems?.find((item) => item.product._id === product._id);

        if(isItemExisted?.quantity === Number(quantity)) {
            toast.info(`Quantity is already present`, {
                    position: "bottom-left"
            })  
        } else if(isItemExisted) {
             isItemExisted.quantity = Number(quantity);
            toast.info(`Increased cart quantity`, {
                    position: "bottom-left"
            })
        } else {    
            state.cartItems.push({product, quantity: Number(quantity)});
            toast.success(`added to cart`, {
                    position: "bottom-left"
                })
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    deleteCartItem: (state, action) => {
        const product = action.payload;
        const itemRemoved = state.cartItems?.filter((item) => item.product._id !== product._id);
        state.cartItems = itemRemoved;
        toast.error(`Removed from cart`, {
                    position: "bottom-left"
        })
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    }
  }
});

export const { addItem, deleteCartItem, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
