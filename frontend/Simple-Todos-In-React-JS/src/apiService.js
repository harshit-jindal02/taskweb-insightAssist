import axios from 'axios'

// API service
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Flask API base URL from environment
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchTodos = async () => {
  try {
    const response = await apiClient.get('/api/todos')
    return response.data
  } catch (error) {
    console.error('Error fetching todos:', error)
    throw error
  }
}

export const createTodo = async content => {
  try {
    const response = await apiClient.post('/task', {content})
    return response.data
  } catch (error) {
    console.error('Error creating todo:', error)
    throw error
  }
}

export const toggleTodoStatus = async taskId => {
  try {
    const response = await apiClient.post('/toggle', {task_id: taskId})
    return response.data
  } catch (error) {
    console.error('Error toggling todo status:', error)
    throw error
  }
}

export const editTodo = async (taskId, editText) => {
  try {
    const response = await apiClient.post('/edit', {
      task_id: taskId,
      edit_text: editText,
    })
    return response.data
  } catch (error) {
    console.error('Error editing todo:', error)
    throw error
  }
}

export const deleteTodo = async taskId => {
  try {
    const response = await apiClient.delete(`/delete/${taskId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting todo:', error)
    throw error
  }
}

export const resolveTodos = async () => {
  try {
    const response = await apiClient.post('/finished')
    return response.data
  } catch (error) {
    console.error('Error resolving todos:', error)
    throw error
  }
}
