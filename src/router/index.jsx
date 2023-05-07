import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Page from '../pages/Page';
import TodoList from '../components/TodoList';
import Currency from '../components/Currency';

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
    ],
  },
]);

export default router;
