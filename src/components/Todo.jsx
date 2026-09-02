import {useState} from "react";
import TodoItem from "./TodoItem";
import { v4 as uuidv4 } from 'uuid';

function Todo() {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input) return;
        setTodos(preV => [...preV, {id:uuidv4(), text: input}]);
        setInput("");
    }
  return (
    <>
          <form onSubmit={handleSubmit}>
              <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} />
              <button type="submit">Add</button>
          </form>
        <ul>
            <TodoItem todos={todos} setTodos={setTodos} />
        </ul>

    </>
  )
}

export default Todo
