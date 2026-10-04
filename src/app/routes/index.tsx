import { useRoutes } from 'react-router-dom';
import { routeConfig } from './routeConfig';

export function AppRoutes() {
  const routes = useRoutes(routeConfig);
  return routes;
}
