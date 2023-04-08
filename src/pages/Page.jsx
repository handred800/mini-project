import { Link, Outlet } from 'react-router-dom';

export default function Page() {
  return (
    <div>
      <Link to="/">返回</Link>
      <Outlet />
    </div>
  );
}
