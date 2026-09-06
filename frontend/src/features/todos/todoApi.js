import api from '../../services/api'

export const getTodos = async () => {
  const response = await api.get('/todos')
  return response.data.data
}

export const createTodo = async (todo) => {
  const response = await api.post('/', { todo })
  return response.data.data
}

export const updateTodo = async (id, todo) => {
  const response = await api.put(`/${id}`, { todo })
  return response.data.data
}

export const deleteTodo = async (id) => {
  await api.delete(`/${id}`)
}