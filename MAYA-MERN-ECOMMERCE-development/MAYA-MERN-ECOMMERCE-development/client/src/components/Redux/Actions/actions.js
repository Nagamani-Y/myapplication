import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

export const getAllProducts = createAsyncThunk(
    "products/getAllPrducts",
    async () => {
        try {
            console.log("🔥 API called from get products");
            const response = await axios.get('/api/products/getAllProducts');
            return response.data;
        } catch (err) {
            throw err;
        }
    }
);

export const getProductById = createAsyncThunk(
    "products/getProductById",
    async (productId) => {
        try {
            const response = await axios.post('/api/products/getProductById', {productById: productId});
            return response.data;
        } catch (err) {
            throw err;
        }
    }
);

export const registerNewUser = createAsyncThunk(
    'auth/registerUser', 
    async (user, { rejectWithValue }) => {
      try {
       const token = await axios.post(`/api/user/register`,{
            name:user.name,
            email:user.email,
            password:user.password
          });
          console.log("Login response:", token.data);
          localStorage.setItem("token", token.data)
          return token.data
      }
      catch (err) {
        toast.error("Registration Failed", { position: "bottom-left" });
        return rejectWithValue(err.response?.data?.message || "Registration is failed");
      }
    }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, { rejectWithValue }) => {
    try {
      const token = await axios.post('/api/user/login', {
        email: user.email,
        password: user.password
      });
      const userData = token.data;
      // Store user info in localStorage
       console.log("Login response:", token.data);
      localStorage.setItem("token", userData);
      return userData;
    } catch (err) {
      toast.error("Login Failed, Please check your credentials and login again.", { position: "bottom-left" });
      return rejectWithValue(err.response?.data?.message || "Login failed");
      
    }
  }
);

export const searchProducts = createAsyncThunk(
  'prodcuts/searchProducts',
  async (searchQuery, {rejectWithValue}) => {
    try{
      console.log("🔥 API called from search");
      const response = await axios.get('/api/products/getAllProducts');
      let products = response.data;
      if(searchQuery){
        products = products.filter(product => {return product.name.toLowerCase().includes(searchQuery.toLowerCase())})
      }
      return products;

    }catch (err) {
      return rejectWithValue(err.response?.data?.message || "No Products");
    }
  }
);
export const filterProducts = createAsyncThunk(
  'products/filterProducts',
  async ({categorykey,sortkey},{rejectWithValue}) => {
    var filterProducts;
      try {
        console.log("🔥 API called from filterProducts");
        const response = await axios.get('/api/products/getallproducts');
        filterProducts = response.data
        if(sortkey !== "popular") {
          if(sortkey === "htl"){
            filterProducts = response.data.sort((a,b)=> {return -a.price + b.price})
          }else {
            filterProducts = response.data.sort((a,b)=> {return a.price - b.price})
          }
        }
        if(categorykey !== "all") {
          filterProducts = response.data.filter(product =>{return product.category.toLowerCase().includes(categorykey)})
        }else {
          filterProducts = response.data
        }
        
        return filterProducts;
      } catch (err) {
        throw rejectWithValue(err.response.data); 
      }
    }
);
export const paymentCheckout = createAsyncThunk(
  'checkout/checkoutUser',
  async ({ token, user, cartItems, totalAmount }, { rejectWithValue }) => {
    const totCartItems = cartItems.map(item => ({
      _id: item?.product?._id,
      name: item?.product?.name,
      quantity: item?.quantity,
      price: item?.product?.price,
    }));

    try {
      const response = await axios.post('/api/orders/checkout', {
        token,
        user,
        cartItems: totCartItems,
        totalAmount: totalAmount  
      });

      return response.data;
    } catch (err) {
      console.error("Payment failed:", err);
      return rejectWithValue(err.response?.data || "Payment failed");
    }
  }
);

export const userOrders = createAsyncThunk(
  'orders/fetchOrdersByUser',
  async (userId, {rejectWithValue}) => {
    try{
      const response = await axios.post('/api/orders/userOrders', {
        userId: userId
      });
      return response.data;
    }catch(err) {
      throw rejectWithValue(err.response.data)
    }
  }
);

export const addReview = createAsyncThunk(
  'products/reviews',
  async ({review, product},{rejectWithValue}) => {
    try{
      const responce = await axios.post('/api/products/addReview', {
        productId: product._id,
        review
      });
      window.location.reload();
      return responce.data;
    }catch(err) {
      rejectWithValue(err.response.data || err.message)
    }
  }
);

export const updateProfile = createAsyncThunk(
  'users/updateProfile',
  async ({updatedUserData, userId},{rejectWithValue}) => {
    try{
      const res = await axios.post('/api/user/updateUser', {
        updatedUserData: updatedUserData,
        userId: userId
      });
      localStorage.setItem('token', res.data);
      return res.data;
    }catch(err) {
      rejectWithValue(err.response.data || err.message)
    }
  }
);