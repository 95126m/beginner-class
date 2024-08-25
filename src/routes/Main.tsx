import { useEffect, Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import TheLoader from '@/components/TheLoader'
import TodoItem from '@/components/TodoItem'
import TodoCreator from '@/components/TodoCreator'
import { useTodosStore } from '@/stores/todos'

export default function App() {
  const todos = useTodosStore(state => state.todos)
  const message = useTodosStore(state => state.message)
  const loading = useTodosStore(state => state.loading)
  const getTodos = useTodosStore(state => state.getTodos)

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      <TodoCreator getTodos={getTodos} />
      <div>{loading && <TheLoader />}</div>
      <div>{message}</div>
      <ul>
        {todos.map(todo => (
          <Fragment key={todo.id}>
            <TodoItem todo={todo} />
          </Fragment>
        ))}
      </ul>
      <Outlet />
    </>
  )
}