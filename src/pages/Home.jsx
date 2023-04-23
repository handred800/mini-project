import { Link } from 'react-router-dom';
import projects from '../assets/projects.json';

export default function Home() {
  return (
    <div className="container">
      <h1 className="text-4xl leading-normal font-bold">✨mini project</h1>
      <p>把 react 製作小東西串成合輯</p>
      <div className="card">
        <ul>
          {projects.map(({ path, name }) => (
            <li key={path}>
              <Link className="flex rounded-md py-3 px-5 bg-transparent hover:bg-gray-100 ease-in-out duration-200" to={`/${path}`}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
