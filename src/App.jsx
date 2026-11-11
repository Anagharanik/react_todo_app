import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTask("");
  };

  const editTodo = (id) => {
    const selectedTodo = todos.find((todo) => todo.id === id);

    setEditId(id);
    setEditText(selectedTodo.text);
  };

  const saveTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo,
      ),
    );

    setEditId(null);
    setEditText("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };
  return (
    <div className="container">
      <div className="todo-box">
        <h1>My Todo App</h1>
        <div className="input-section">
          <input
            type="text"
            placeholder="enter your task here"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button onClick={addTodo}>add Todo</button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />

              {editId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />

                  <button onClick={() => saveTodo(todo.id)}>Save</button>

                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span className={todo.completed ? "completed" : ""}>
                    {todo.text}
                  </span>

                  <button
                    className="edit-btn"
                    onClick={() => editTodo(todo.id)}
                  >
                    Edit
                  </button>
                </>
              )}
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
