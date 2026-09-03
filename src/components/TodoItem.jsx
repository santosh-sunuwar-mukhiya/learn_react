function TodoItem({todos, setTodos, setEdit, setInput}) {
    const handleDelete = (id) => {
        setTodos(todos.filter((item) => item.id !== id));
    }

    const handleEdit = (todo) => {
        setInput(todo.text)
        setEdit(todo.id);
    }
    return (
        <>
            {
                todos.map(
                    (todo) => (
                        <li key={todo.id}>
                            {todo.text}{" "}
                            <span onClick={()=>handleEdit(todo)} className={'px-2 py-1 border-amber-50'}>edit</span>{" "}
                            <span
                                style={{ cursor: "pointer", color: "red" }}
                                onClick={()=>handleDelete(todo.id)}
                            >
                                X
                            </span>
                        </li>
                    )
                )
            }
        </>
    )
}

export default TodoItem