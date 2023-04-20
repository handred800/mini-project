import { useMemo, useState } from 'react';

export default function TodoList() {
  const [todoInputVal, setTodoInputVal] = useState('');
  const [todos, setTodos] = useState([]);
  const [currentFilter, setFilter] = useState(null);

  function inputHandler(e) {
    setTodoInputVal(e.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    if (todoInputVal.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        name: todoInputVal,
        isCheck: false,
      };
      setTodos([...todos, newTodo]);
      setTodoInputVal('');
    }
  }

  function selectFilter(e) {
    e.preventDefault();
    const val = e.target.value === 'null' ? null : e.target.value === 'true';
    setFilter(val);
  }

  function checkboxHandler(todoId) {
    const renewTodos = todos.map((todo) => {
      if (todo.id !== todoId) return todo;
      return {
        ...todo,
        isCheck: !todo.isCheck,
      };
    });
    setTodos(renewTodos);
  }

  function deleteHandler(todoId) {
    const renewTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(renewTodos);
  }

  const filtedTodos = useMemo(() => {
    if (currentFilter === null) return todos;
    return todos.filter(({ isCheck }) => isCheck === currentFilter);
  }, [todos, currentFilter]);

  return (
    <div>
      <h1 className="text-2xl font-bold">this is TodoList</h1>
      <form onSubmit={submitHandler}>
        <select name="" id="" onChange={selectFilter}>
          <option value="null">全部</option>
          <option value="true">已完成</option>
          <option value="false">未完成</option>
        </select>
        <input className="bg-gray-200 p-1" type="text" value={todoInputVal} onInput={inputHandler} />
        <button className="btn" type="submit">
          送出
        </button>
      </form>
      <ul>
        {filtedTodos.map((todo) => (
          <li key={todo.id} title={todo.id}>
            <label htmlFor={todo.id} className="flex">
              <input
                id={todo.id}
                type="checkbox"
                checked={todo.isCheck}
                onChange={() => {
                  checkboxHandler(todo.id);
                }}
              />
              {todo.name}
              <button
                className="btn"
                type="button"
                onClick={() => {
                  deleteHandler(todo.id);
                }}
              >
                X
              </button>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
