import React from 'react'
import '../styles/TodoItem.css'

const TodoItem = ({title, description, isCompleted, updateHandler, deleteHandler, id}) => {

  return (
    <div className='ttodo'>
        <div className='task-details'>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
        <div className='action'>
            <input onChange={() => updateHandler(id)} type="checkbox" checked={isCompleted} />
            <button onClick={() => deleteHandler(id)} className='btn'>Delete</button>
        </div>
    </div>
  )
}

export default TodoItem;