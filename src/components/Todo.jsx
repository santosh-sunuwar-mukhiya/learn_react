import {useEffect, useState} from "react";
import TodoItem from "./TodoItem";
import { v4 as uuidv4 } from 'uuid';

function Todo() {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState(()=>{
        const savedTodos = localStorage.getItem("todos");

        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [edit, setEdit] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputTrimmed = input.trim();
        if (inputTrimmed === '') return;
        if(edit !== null){
            setTodos(todos.map((todo)=>(todo.id === edit ? {...todo, text: inputTrimmed}: todo)));
            setEdit(null);
        }else{
            setTodos(preV => [...preV, {id:uuidv4(), text: inputTrimmed}]);
        }

        setInput("");
    }

    useEffect(() => {
       localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])
  return (
    <>
          <form onSubmit={handleSubmit} className={'border mb-2'}>
              <input type="text" className={'p-2 rounded-2xl mr-2 focus:border-black-1'} value={input} onChange={(e)=>setInput(e.target.value)} />
              <button type="submit" className={'py-2 px-6 rounded-2xl border-0 outline-0 cursor-pointer hover:bg-red-500 hover:text-white'}>{edit !== null ? "Update" : "Add"}</button>
          </form>
        <ul className={'list-unstyled text-2xl'}>
            <TodoItem todos={todos} setTodos={setTodos} setEdit={setEdit} setInput={setInput} />
        </ul>

    </>
  )
}

export default Todo
