import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTodosStore } from '@/stores/todos'
import type { Todo } from '@/stores/todos'

export default function TodoItem({ todo }: { todo: Todo }) {
  const [title, setTItle] = useState(todo.title)
  const [done, setDone] = useState(todo.done)
  const updateTodo = useTodosStore(state => state.updateTodo)
  const deleteTodo = useTodosStore(state => state.deleteTodo)

  useEffect(() => {
    setTItle(todo.title)
    setDone(todo.done)
  }, [todo])
  
  async function keydownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      updateTodo({
        ...todo,
        title
      })
    }
  }

  return (
    <li>
      <Link to={`/${todo.id}`}>{todo.title}</Link>
      <input
        type="checkbox"
        checked={done}
        onChange={e => {
          setDone(e.target.checked)
          updateTodo({
            ...todo,
            done: e.target.checked
          })
        }}
      />
      <input
        value={title}
        onChange={e => setTItle(e.target.value)}
        onKeyDown={keydownHandler}
      />
      <button onClick={() => deleteTodo(todo)}>삭제</button>
      <button className='drag-handle'>핸들</button>
    </li>
  )
}