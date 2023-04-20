import { Link, Outlet } from 'react-router-dom';

export default function Page() {
  return (
    <div className="container">
      <Link to="/">返回</Link>
      <Outlet />
    </div>
  );
}
