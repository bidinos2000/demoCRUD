import React from 'react';
import LoginForm from './components/Login/LoginForm';
import RegisterForm from './components/Register/RegisterForm';
import HomePage from './pages/HomePage/HomePage';
import Managers from './pages/ManagerPage/Manger';

const routers = [
    {
        path: '/home',
        exact: false,
        main : () => <HomePage />
    },
    {
        path: '/manager',
        exact: false,
        main: () => <Managers />
    },
    {
        path: '/',
        exact: true,
        main: () => <LoginForm />
    },
    {
        path: '/register',
        exact: false,
        main: () => <RegisterForm />
    }
];

export default routers;