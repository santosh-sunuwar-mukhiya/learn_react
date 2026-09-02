function TodoItem({todos, setTodos}) {
    const handleDelete = (id) => {
        setTodos(todos.filter((item) => item.id !== id));
    }
    return (
        <>
            {
                todos.map(
                    (todo) => (
                        <li key={todo.id}>
                            {todo.text}{" "}
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