import React from 'react'
import './index.css'

const TodoItem = props => {
  const {
    content,
    id,
    done,
    deleteBtn = () => {},
    toggleBtn = () => {},
    editBtn = () => {},
  } = props

  const [isEditing, setIsEditing] = React.useState(false)
  const [editValue, setEditValue] = React.useState(content)

  const onDelete = () => {
    if (typeof deleteBtn === 'function') deleteBtn(id)
  }

  const onToggle = () => {
    if (typeof toggleBtn === 'function') toggleBtn(id)
  }

  const onEdit = () => {
    setIsEditing(true)
  }

  const onEditChange = e => {
    setEditValue(e.target.value)
  }

  const onEditSave = () => {
    if (typeof editBtn === 'function' && editValue.trim()) {
      editBtn(id, editValue.trim())
      setIsEditing(false)
    }
  }

  const onEditCancel = () => {
    setEditValue(content)
    setIsEditing(false)
  }

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={!!done}
        onChange={onToggle}
        style={{marginRight: 8}}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editValue}
            onChange={onEditChange}
            style={{marginRight: 8}}
          />
          <button type="button" onClick={onEditSave}>
            Save
          </button>
          <button type="button" onClick={onEditCancel} style={{marginLeft: 4}}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span style={{textDecoration: done ? 'line-through' : 'none'}}>
            {content}
          </span>
          <button type="button" onClick={onEdit} style={{marginLeft: 8}}>
            Edit
          </button>
        </>
      )}
      <button type="button" onClick={onDelete} style={{marginLeft: 12}}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
