import React from 'react';
//Pages and Components
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import ProductDetails from '../pages/ProductDetails';
import Shop from '../pages/Shop';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
//Admin
import AllProducts from '../admin/AllProducts';
import AddProducts from '../admin/AddProducts';
import Dashboard from '../admin/Dashboard';
//Router
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';


const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/shop/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='' element={<ProtectedRoute />} >
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/dashboard/all-products' element={<AllProducts />} />
                <Route path='/dashboard/add-product' element={<AddProducts />} />
            </Route>
        </Routes>
    );
};

export default Routers;
