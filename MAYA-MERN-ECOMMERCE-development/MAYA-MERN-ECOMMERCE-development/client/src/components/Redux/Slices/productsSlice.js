import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { getAllProducts, getProductById, searchProducts, filterProducts, addReview } from "../Actions/actions";

const ProductsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status:'idle',
        error: null, 
    },
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase(getAllProducts.pending, (state) => {
            state.status =  'LOADING';

        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.status = 'SUCCESS';
            state.products = action.payload;
        }) 
        .addCase(getAllProducts.rejected, (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        })
        .addCase(searchProducts.pending, (state) => {
            state.status =  'LOADING';

        })
        .addCase(searchProducts.fulfilled, (state, action) => {
            state.status = 'SUCCESS';
            state.products = action.payload;
        }) 
        .addCase(searchProducts.rejected, (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        })

        .addCase(filterProducts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(filterProducts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload;
        })
        .addCase(filterProducts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })

    },
})

const productByIdSlice = createSlice({
    name: 'Product by Id',
    initialState: {
        product: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers:(builder) => {
        builder
         .addCase(getProductById.pending, (state) => {
            state.status =  'LOADING';   
        })
        .addCase(getProductById.fulfilled, (state, action) => {
            state.status = 'SUCCESS';
            state.product = action.payload;
        }) 
        .addCase(getProductById.rejected, (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        })
    }
});

const addReviewIdSlice = createSlice({
    name: 'Review',
    initialState: {
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers:(builder) => {
        builder
         .addCase(addReview.pending, (state) => {
            state.status =  'LOADING';   
        })
        .addCase(addReview.fulfilled, (state, action) => {
            state.status = 'SUCCESS';
        }) 
        .addCase(addReview.rejected, (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        })
    }
});


const ProductsSliceReducer = combineReducers ({
    productsList: ProductsSlice.reducer,
    productById: productByIdSlice.reducer,
    addReview: addReviewIdSlice
})
export default ProductsSliceReducer;