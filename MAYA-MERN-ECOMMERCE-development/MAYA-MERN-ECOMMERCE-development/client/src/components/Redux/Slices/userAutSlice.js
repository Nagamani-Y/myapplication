import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { registerNewUser, loginUser, updateProfile } from "../Actions/actions";
import { toast } from "react-toastify";
import { jwtDecode } from 'jwt-decode';


const initialState = {
    token: localStorage.getItem("token") ? (localStorage.getItem("token")) : "",
    status: "",
    error: "",
    _id: "",
    name: "",
    email: "",
    isAdmin: false,
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        loadUser: (state, action) => {
            const token = state.token;
            if (token) {
                const user = jwtDecode(token);
                return {
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    userLoaded: true,
                };
            } else return { ...state, userLoaded: true };
        },
        logoutUser: (state, action) => {
            localStorage.removeItem('cartItems');
            localStorage.removeItem('token');
            return {
                ...state,
                token: "",
                name: "",
                email: "",
                _id: "",
                registerStatus: "",
                registerError: "",
                loginStatus: "",
                loginError: "",
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerNewUser.pending, (state) => {
                state.registerStatus = 'LOADING';
            })
            .addCase(registerNewUser.fulfilled, (state, action) => {
                if (action.payload) {
                    const user = jwtDecode(action.payload);
                    toast.success("User Sucessfully Registered......", { position: "bottom-left" })
                    return {
                        ...state,
                        token: action.payload,
                        name: user.name,
                        email: user.email,
                        _id: user._id,
                        registerStatus: "Success"
                    }
                } else return state;
            })
            .addCase(registerNewUser.rejected, (state, action) => {
                state.registerError = 'REJECTED';
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.loginStatus = 'LOADING';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                if (action.payload) {
                    const user = jwtDecode(action.payload);
                    toast.success(`User Successfully LoggedIn.....`, {
                        position: "bottom-left"
                    })
                    return {
                        ...state,
                        token: action.payload,
                        name: user.name,
                        email: user.email,
                        _id: user._id,
                        loginStatus: "Success"
                    }

                } else return state;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loginError = 'REJECTED';
                state.error = action.error.message;
            })
            .addCase(updateProfile.pending, (state) => {
                state.updateStatus = 'pending';
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                if (action.payload) {
                    const user = jwtDecode(action.payload)
                    return {
                         ...state,
                        token: action.payload,
                        name: user.name,
                        email: user.email,
                        _id: user._id,
                        updateStatus: "Success"
                    }
                } else return state
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.updateStatus = 'rejected';
                state.updateError = action.payload;
            });
    }
});


export const { logoutUser, loadUser } = authSlice.actions;
const UsersSliceReducer = combineReducers({
    auth: authSlice.reducer
})
export default UsersSliceReducer;