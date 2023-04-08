import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>this is Home</h1>
      <p>hello world!</p>
      <ul>
        <li><Link to="/todolist">todo list</Link></li>
      </ul>
    </div>
  );
}
