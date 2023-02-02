import React from 'react';
import { BrowserRouter, Router, useRoutes } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

import { routesAuth } from './auth.routes';
import { routesAdmin } from './app.routes';
import { routesClient } from './client.routes';

const Routes: React.FC = () => {

    const { jwt } = useAuth();


    const routeRedirect = () => {
        if (jwt == undefined) {
            return useRoutes(routesAuth);
        }
        if (jwt.is_employee == true) {
            return useRoutes(routesAdmin)
        }
        if (jwt.is_client == true) {
            return useRoutes(routesClient)
        }
        return useRoutes(routesAuth)
    }

    return (
        <>
            {routeRedirect()}
        </>
    );
}

export default Routes;