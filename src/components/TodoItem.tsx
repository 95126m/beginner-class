import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Todo } from '@/routes/Main'
export default function TodoItem({
  todo,
  setTodo,
  deleteTodo
}: {
  todo: Todo
  setTodo: (updatedTodo: Todo) => void
  deleteTodo: (todoToDelete: Todo) => void
}) {
  const [title, setTitle] = useState(todo.title)
  async function keydownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      updateTodo()
    }
  }
  async function updateTodo() {
    const res = await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          apikey: 'KDT9_AHMq2s7n',
          username: 'FE1_KimYoungEun'
        },
        body: JSON.stringify({
          title,
          done: todo.done
        })
      }
    )
    const updatedTodo: Todo = await res.json()
    console.log(updatedTodo, title)
    setTodo(updatedTodo)
  }
  async function deleteMe() {
    await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          apikey: 'KDT9_AHMq2s7n',
          username: 'FE1_KimYoungEun'
        }
      }
    )
    deleteTodo(todo)
  }

  return (
    <li>
      <Link to={`/${todo.id}`}>
        {todo.title}
      </Link>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={keydownHandler}
      />
      <button onClick={() => deleteMe()}>삭제</button>
    </li>
  )
}
