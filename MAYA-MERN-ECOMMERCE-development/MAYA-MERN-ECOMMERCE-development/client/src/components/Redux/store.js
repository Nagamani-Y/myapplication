import { configureStore } from "@reduxjs/toolkit";
import ProductsSliceReducer from "./Slices/productsSlice";
import UsersSliceReducer from "./Slices/userAutSlice";
import CartSliceReducer from "./Slices/cartSlice";
import checkoutSliceReducer from "./Slices/paymentSlice";

const store = configureStore ({
    reducer: {
    products: ProductsSliceReducer,
    cart: CartSliceReducer,
    users: UsersSliceReducer,
    order: checkoutSliceReducer

    }
})

export default store;

