import { useState } from 'react'
import type { Todo } from '../App'
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
    // 낙관적 업데이트
    // setTodo({
    //     ...todo, // 얕은 복사
    //     title
    // })
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
      {todo.title}
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={keydownHandler}
      />
      <button onClick={() => deleteMe()}>삭제</button>
    </li>
  )
}
