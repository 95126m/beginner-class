import axios from 'axios'
import { create } from 'zustand'
import { combine, subscribeWithSelector } from 'zustand/middleware'

export type Todos = Todo[]
export interface Todo {
  id: string
  order: number
  title: string
  done: boolean
  createdAt: string
  updatedAt: string
}

export const useTodosStore = create(
  subscribeWithSelector(
    combine(
      {
        todos: [] as Todos,
        filteredTodos: [] as Todos,
        filterStatus: 'all',
        filters: [
          { text: '전체', value: 'all' },
          { text: '할 일', value: 'todo' },
          { text: '완료', value: 'done' }
        ],
        message: '',
        loading: true
      },
      function (set) {
        function setFilterStatus(status: string) {
          set({
            filterStatus: status
          })
        }
        async function getTodos() {
          try {
            const { data } = await axios.post('/api/todos')
            console.log('응답결과: ', data)
            set({
              todos: data
            })
          } catch (error) {
            if (error instanceof Error) {
              const message = '서버가 폭팔했어요'
              console.error('에러..', message)
              set({
                message
              })
            }
          } finally {
            set({
              loading: false
            })
          }
        }

        async function updateTodo(updatedTodo: Todo) {
          try {
            await axios.post('/api/todos', {
              endpoint: updatedTodo.id,
              method: 'PUT',
              data: {
                title: updatedTodo.title,
                done: updatedTodo.done
              }
            })
            getTodos()
          } catch (error) {
            console.error(error)
          }
        }

        async function deleteTodo(deletedTodo: Todo) {
          await axios.post('/api/todos', {
            endpoint: deletedTodo.id,
            method: 'DELETE'
          })
          await getTodos()
        }
        async function reorderTodos({
          oldIndex,
          newIndex
        }: {
          oldIndex: number
          newIndex: number
        }) {
          set(state => {
            const { todos } = state
            // splice(시작인덱스, 삭제할 요소 개수, 추가할 요소)
            const [removedItem] = todos.splice(oldIndex, 1)
            todos.splice(newIndex, 0, removedItem)
            axios.post('/api/todos', {
              endpoint: 'reorder',
              method: 'PUT',
              data: {
                todoIds: todos.map(todo => todo.id)
              }
            })
            return {
              todos
            }
          })
        }
        return {
          setFilterStatus,
          getTodos,
          updateTodo,
          deleteTodo,
          reorderTodos
        }
      }
    )
  )
)

useTodosStore.subscribe(
  state => state.todos,
  todos => {
    const filterStatus = useTodosStore.getState().filterStatus
    const newTodos = todos.filter(todo => {
      if (filterStatus === 'all') return true
      if (filterStatus === 'todo') return !todo.done
      if (filterStatus === 'done') return todo.done
      return true
    })
    useTodosStore.setState(() => ({ filteredTodos: newTodos }))
  }
)

useTodosStore.subscribe(
  state => state.filterStatus,
  () => {
    const todos = useTodosStore.getState().todos
    useTodosStore.setState(() => ({ todos: [...todos] }))
  }
)

// const state = get()
// @ts-ignore
// state.getTodos()

//@ts-ignore
// await get().getTodos()
// promise 인스턴스를 반환하는 함수에만 await를 사용할 수 있다.
