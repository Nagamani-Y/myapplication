import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { paymentCheckout, userOrders } from "../Actions/actions";

const PaymentSlice = createSlice({
    name: 'ProductById',
    initialState: {
        status: "",
        error: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(paymentCheckout.pending, (state) => {
                state.status = 'LOADING';
            })
            .addCase(paymentCheckout.fulfilled, (state, action) => {
                if (action.payload) {
                    return {
                        ...state,
                        status: "Succeeded"
                    }
                } else return state
            })
            .addCase(paymentCheckout.rejected, (state, action) => {
                state.status = 'REJECTED';
                state.error = action.error.message;
            })
           
        }
    });
const UserOrdersSlice = createSlice({
    name: 'UserOrders',
    initialState: {
        orders: [],
        status: "",
        error: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userOrders.pending, (state) => {
                state.status = 'LOADING';
            })
            .addCase(userOrders.fulfilled, (state, action) => {
               state.status = 'SUCCESS';
               state.orders = action.payload;
            })
            .addCase(userOrders.rejected, (state, action) => {
                state.status = 'REJECTED';
                state.error = action.error.message;
            })
    }
});

const checkoutSliceReducer = combineReducers ({
    PaymentStatus: PaymentSlice.reducer,
    UserOrders: UserOrdersSlice.reducer

})
export default checkoutSliceReducer;