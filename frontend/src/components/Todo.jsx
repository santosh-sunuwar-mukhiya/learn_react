import { useState } from 'react'
import TodoItem from './TodoItem'
import { useTodos } from '../features/todos/useTodos'

function Todo() {
    const [input, setInput] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { todos, isLoading, error, addTodo, editTodo, removeTodo, reload } = useTodos()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const trimmedInput = input.trim()
        if (!trimmedInput || isSubmitting) return

        setIsSubmitting(true)
        try {
            if (editingId) {
                await editTodo(editingId, trimmedInput)
                setEditingId(null)
            } else {
                await addTodo(trimmedInput)
            }
            setInput('')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleEdit = (todo) => {
        setInput(todo.todo)
        setEditingId(todo._id)
    }

    const handleCancelEdit = () => {
        setInput('')
        setEditingId(null)
    }

    return (
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/20 backdrop-blur">
            <div className="border-b border-white/10 px-5 py-5 sm:px-8">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-white">Your list</h2>
                        <p className="mt-1 text-sm text-slate-400">
                            {todos.length} {todos.length === 1 ? 'task' : 'tasks'} in progress
                        </p>
                    </div>
                    <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-200">
                        Synced
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 border-b border-white/10 p-5 sm:flex-row sm:p-8">
                <label className="sr-only" htmlFor="todo-input">Task</label>
                <input
                    id="todo-input"
                    type="text"
                    maxLength={160}
                    placeholder="What needs your attention?"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-cyan-300 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting ? 'Saving...' : editingId ? 'Update task' : 'Add task'}
                </button>
                {editingId && (
                    <button type="button" onClick={handleCancelEdit} className="rounded-xl border border-white/15 px-4 py-3 font-semibold text-slate-300 transition hover:border-white/30 hover:text-white">
                        Cancel
                    </button>
                )}
            </form>

            {error && (
                <div className="mx-5 mt-5 flex items-center justify-between gap-4 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200 sm:mx-8">
                    <p>{error}</p>
                    <button type="button" onClick={reload} className="shrink-0 font-bold text-white underline underline-offset-4">Retry</button>
                </div>
            )}

            <div className="p-5 sm:p-8">
                {isLoading ? (
                    <p className="py-8 text-center text-slate-400">Loading your tasks...</p>
                ) : todos.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/15 px-6 py-12 text-center">
                        <p className="font-semibold text-white">Nothing here yet.</p>
                        <p className="mt-2 text-sm text-slate-400">Add a task above and make your next step visible.</p>
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {todos.map((todo) => (
                            <TodoItem key={todo._id} todo={todo} onEdit={handleEdit} onDelete={removeTodo} />
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}

export default Todo
