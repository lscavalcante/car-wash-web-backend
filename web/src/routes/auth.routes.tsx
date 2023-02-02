import React from 'react';

import { Routes ,Route, RouteObject } from 'react-router-dom';
import AdminLayout from '../layout/admin';
import Login from '../pages/Login';


export const routesAuth: RouteObject[] = [
    {
      element: <AdminLayout />,
      children: [
        {
          path: '/',
          element: <Login />,
        },
      ]
    }
  ];

const AuthRoutes: React.FC = () => (
    <Routes>
        <Route path='/' element={<Login/>} />
    </Routes>
)

export default AuthRoutes;