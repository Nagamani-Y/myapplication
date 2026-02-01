import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import HomeScreenPage from './Components/Screens/HomeScreen';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ProductDesScreen from './Components/Screens/ProductDesScreen';
import 'font-awesome/css/font-awesome.min.css';
import CartPage from './Components/Screens/CartScreen';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import RegistrationScreen from './Components/Screens/RegistrationScreen';
import LoginScreen from './Components/Screens/LoginScreen';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { loadUser } from './Components/Redux/Slices/userAutSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PaymentSuccess from './Components/Screens/PaymentSuccess';
import Footer from './Components/Screens/Footer';
import UserOrdersPage from './Components/Screens/UserOrders';
import OrderDetailsPage from './Components/Screens/OrderDetailsPage'
import ProfilePage from './Components/Screens/ProfileScreen';

function AppLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser(null));
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomeScreenPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDesScreen />,
      },
      {
        path: "/cart",
        element: <CartPage />
      },
      {
        path: "/login",
        element: <LoginScreen />
      },
      {
        path: "/register",
        element: <RegistrationScreen />
      },
      {
        path: "/paymentSucess",
        element: <PaymentSuccess />
      },
      {
        path: "/userOrders",
        element: <UserOrdersPage />
      },
      {
        path: "/order/:id",
        element: <OrderDetailsPage />
      },
      {
        path: '/userProfile',
        element: <ProfilePage />
      }
    ],
  },
]);

export default appRouter;
