import React from 'react';

import { Routes, Route, createBrowserRouter, RouteObject, } from 'react-router-dom';
import AdminLayout from '../layout/admin';
import CategoryPage from '../pages/Category';
import EditCategoryPage from '../pages/Category/EditCategory';
import NewCategoryPage from '../pages/Category/NewCategory';
import ClientsPage from '../pages/Clients';
import FormPage from '../pages/Form';
import HomePage from '../pages/Home';
import NotFound from '../pages/NotFound';
import ServicePage from '../pages/Service';
import EditServicePage from '../pages/Service/EditService';
import NewServicePage from '../pages/Service/NewService';
import UserPage from '../pages/User';
import { EditUserPage } from '../pages/User/UserDetail';
import VehiclesPage from '../pages/Vehicles';
import EditVehiclePage from '../pages/Vehicles/EditVehicle';
import NewVehiclePage from '../pages/Vehicles/NewVehicle';

export const routesAdmin: RouteObject[] = [
  {
    element: <AdminLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/form',
        element: <FormPage />
      },
      {
        path: 'categories',
        children: [
          {
            path: "",
            element: <CategoryPage />
          },
          {
            path: "new",
            element: <NewCategoryPage />
          },
          {
            path: ":id",
            element: <EditCategoryPage />
          },
        ]
      },
      {
        path: 'vehicles',
        children: [
          {
            path: "",
            element: <VehiclesPage />
          },
          {
            path: "new",
            element: <NewVehiclePage />
          },
          {
            path: ":id",
            element: <EditVehiclePage />
          },
        ]
      },
      {
        path: 'clients',
        children: [
          {
            path: "",
            element: <ClientsPage />
          },
        ]
      },
      {
        path: 'users',
        children: [
          {
            path: "",
            element: <UserPage />
          },
          {
            path: ":id",
            element: <EditUserPage />
          },
        ]
      },
      {
        path: 'services',
        children: [
          {
            path: "",
            element: <ServicePage />
          },
          {
            path: "new",
            element: <NewServicePage />
          },
          {
            path: ":id",
            element: <EditServicePage />
          },
        ]
      },
      {
        path: '*',
        element: <NotFound />
      },
    ],
  },
];