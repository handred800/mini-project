import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import TodoList from '../components/TodoList';
import Page from '../pages/Page';

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
    ],
  },
]);

export default router;
