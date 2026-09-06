import { useCallback, useEffect, useState } from 'react'
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from './todoApi'

const getErrorMessage = (error) =>
  error.response?.data?.message || 'Something went wrong. Please try again.'

export function useTodos() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadTodos = useCallback(async () => {
    setIsLoading(true)
    setError('')

    try {
      setTodos(await getTodos())
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    queueMicrotask(loadTodos)
  }, [loadTodos])

  const addTodo = async (todo) => {
    setError('')
    try {
      const createdTodo = await createTodo(todo)
      setTodos((currentTodos) => [createdTodo, ...currentTodos])
    } catch (requestError) {
      setError(getErrorMessage(requestError))
      throw requestError
    }
  }

  const editTodo = async (id, todo) => {
    setError('')
    try {
      const updatedTodo = await updateTodo(id, todo)
      setTodos((currentTodos) =>
        currentTodos.map((currentTodo) =>
          currentTodo._id === id ? updatedTodo : currentTodo,
        ),
      )
    } catch (requestError) {
      setError(getErrorMessage(requestError))
      throw requestError
    }
  }

  const removeTodo = async (id) => {
    setError('')
    try {
      await deleteTodo(id)
      setTodos((currentTodos) =>
        currentTodos.filter((currentTodo) => currentTodo._id !== id),
      )
    } catch (requestError) {
      setError(getErrorMessage(requestError))
      throw requestError
    }
  }

  return {
    todos,
    isLoading,
    error,
    addTodo,
    editTodo,
    removeTodo,
    reload: loadTodos,
  }
}