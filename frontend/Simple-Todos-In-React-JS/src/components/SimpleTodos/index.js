import {Component} from 'react'
import {
  fetchTodos,
  createTodo,
  toggleTodoStatus,
  deleteTodo,
  editTodo,
} from '../../apiService'
import './index.css'
import TodoItem from '../TodoItem'

class SimpleTodos extends Component {
  state = {list: [], newTodo: ''}

  componentDidMount() {
    this.loadTodos()
  }

  loadTodos = async () => {
    try {
      const todos = await fetchTodos()
      this.setState({list: todos})
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    }
  }

  addTodo = async content => {
    try {
      const newTodo = await createTodo(content)
      this.setState(prevState => ({
        list: [...prevState.list, newTodo],
        newTodo: '',
      }))
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  toggleTodoItem = async taskId => {
    try {
      const updatedTodo = await toggleTodoStatus(taskId)
      this.setState(prevState => ({
        list: prevState.list.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        ),
      }))
    } catch (error) {
      console.error('Failed to toggle todo status:', error)
    }
  }

  deleteItem = async id => {
    try {
      await deleteTodo(id)
      this.setState(prevState => ({
        list: prevState.list.filter(item => item.id !== id),
      }))
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  editTodo = async (id, newContent) => {
    try {
      const updatedTodo = await editTodo(id, newContent)
      this.setState(prevState => ({
        list: prevState.list.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        ),
      }))
    } catch (error) {
      console.error('Failed to edit todo:', error)
    }
  }

  handleInputChange = e => {
    this.setState({newTodo: e.target.value})
  }

  handleAdd = e => {
    e.preventDefault()
    const {newTodo} = this.state
    if (newTodo.trim()) {
      this.addTodo(newTodo.trim())
    }
  }

  render() {
    const {list, newTodo} = this.state
    return (
      <div className="container">
        <h1>Tasks List</h1>
        <form onSubmit={this.handleAdd}>
          <input
            type="text"
            value={newTodo}
            onChange={this.handleInputChange}
            placeholder="What do you want to do today?"
          />
          <button type="submit">Add Task</button>
        </form>
        <ul>
          {list.map(eachItem => (
            <TodoItem
              deleteBtn={this.deleteItem}
              toggleBtn={this.toggleTodoItem}
              editBtn={this.editTodo}
              content={eachItem.content}
              id={eachItem.id}
              done={eachItem.done}
              key={eachItem.id}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default SimpleTodos
