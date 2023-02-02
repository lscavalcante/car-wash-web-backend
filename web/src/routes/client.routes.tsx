import { RouteObject } from 'react-router-dom';
import ClientLayout from '../layout/client';
import NotFound from '../pages/NotFound';
import SearchPage from '../pages/Search';

export const routesClient: RouteObject[] = [
  {
    element: <ClientLayout />,
    children: [
      {
        path: '/',
        element: <SearchPage />
      },
      {
        path: '*',
        element: <NotFound />
      },
    ],
  },
];