import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Page from '../pages/Page';
import TodoList from '../pages/TodoList';
import Currency from '../pages/Currency';
import WeatherApp from '../pages/WeatherApp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/',
    element: <Page />,
    children: [
      {
        path: 'todolist',
        element: <TodoList />,
      },
      {
        path: 'currency',
        element: <Currency />,
      },
      {
        path: 'weather',
        element: <WeatherApp />,
      },
    ],
  },
]);

export default router;
