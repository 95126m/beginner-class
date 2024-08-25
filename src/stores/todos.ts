import { create } from 'zustand' 
import { combine } from 'zustand/middleware' 

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
  combine(
    {
      todos: [] as Todos,
      message: '',
      loading: true
    },
    function (set) {
      async function getTodos() {
        try {
          const res = await fetch(
            'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
            {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                apikey: 'KDT9_AHMq2s7n',
                username: 'FE1_ParkSuHyun'
              }
            }
          )
          const data = await res.json()
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
          await fetch(
            `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${updatedTodo.id}`,
            {
              method: 'PUT',
              headers: {
                'content-type': 'application/json',
                apikey: 'KDT9_AHMq2s7n',
                username: 'FE1_ParkSuHyun'
              },
              body: JSON.stringify({
                title: updatedTodo.title,
                done: updatedTodo.done
              })
            }
          )
          getTodos()
        } catch (error) {
          console.error(error)
        }
      }

      async function deleteTodo(deletedTodo: Todo) {
        await fetch(
          `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${deletedTodo.id}`, //:todoId
          {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
              apikey: 'KDT9_AHMq2s7n',
              username: 'FE1_ParkSuHyun'
            }
          }
        )
        getTodos()
      }

      return {
        getTodos,
        updateTodo,
        deleteTodo
      }
    }
  )
)

//  1.
// set ({
//   상태이름: 새로운 값
// })

//  2.
// set (() => {})
// set((state) => {})
// set((state) => { return {
// 상태이름: 새로운 값
// }})