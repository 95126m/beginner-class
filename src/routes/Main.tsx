import { useEffect, useRef, Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Sortable from 'sortablejs'
import TheLoader from '@/components/TheLoader'
import TodoItem from '@/components/TodoItem'
import TodoCreator from '@/components/TodoCreator'
import { useTodosStore } from '@/stores/todos'
import TodoFilters from '@/components/TodoFilters'

export default function App() {
  const todos = useTodosStore(state => state.filteredTodos)
  const message = useTodosStore(state => state.message)
  const loading = useTodosStore(state => state.loading)
  const getTodos = useTodosStore(state => state.getTodos)
  const reorderTodos = useTodosStore(state => state.reorderTodos)
  const listRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    getTodos()
    // new Sortable(목록요소, 옵션)
    if (!listRef.current) return // 타입가드
    new Sortable(listRef.current, {
      handle: '.drag-handle',
      animation: 0,
      forceFallback: true,
      onEnd: event => {
        console.log(event.oldIndex, event.newIndex)
        if (event.oldIndex === undefined || event.newIndex === undefined) return
        reorderTodos({
          oldIndex: event.oldIndex,
          newIndex: event.newIndex
        })
      }
    })
  }, [])

  return (
    <>
      <TodoCreator getTodos={getTodos} />
      <TodoFilters />
      <div>{loading && <TheLoader />}</div>
      <div>{message}</div>
      <ul ref={listRef}>
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
