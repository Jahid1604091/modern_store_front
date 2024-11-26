import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import { store } from './store';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import PrivateRoute from './components/PrivateRoute';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import ProfilePage from './pages/ProfilePage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index path='/' element={<HomePage />} />
      <Route path='/products/:id' element={<ProductDetailsPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingAddressPage />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/placeorder' element={<PlaceOrderPage />} />
        <Route path='/orders/:id' element={<OrderDetailsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
