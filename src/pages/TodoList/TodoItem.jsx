export default function TodoItem(props) {
  const { todo, deleteFunc, checkFunc } = props;

  return (
    <label title={todo.id} htmlFor={todo.id} className="card flex flex-wrap justify-between items-center mb-2">
      <input
        className="checkbox"
        id={todo.id}
        type="checkbox"
        checked={todo.isCheck}
        onChange={() => {
          checkFunc(todo.id);
        }}
      />
      <div className="px-2">{todo.name}</div>
      <button
        className="btn bg-rose-500 text-white hover:bg-rose-700"
        type="button"
        onClick={() => {
          deleteFunc(todo.id);
        }}
      >
        X
      </button>
    </label>
  );
}
