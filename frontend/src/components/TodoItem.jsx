function TodoItem({ todo, onEdit, onDelete }) {
    return (
        <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-4">
            <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-300" aria-hidden="true" />
            <span className="min-w-0 flex-1 break-words text-sm leading-6 text-slate-200">{todo.todo}</span>
            <div className="flex shrink-0 items-center gap-3 text-sm font-semibold">
                <button type="button" onClick={() => onEdit(todo)} className="text-cyan-300 transition hover:text-cyan-100">Edit</button>
                <button type="button" onClick={() => onDelete(todo._id)} className="text-rose-300 transition hover:text-rose-100">Delete</button>
            </div>
        </li>
    )
}

export default TodoItem