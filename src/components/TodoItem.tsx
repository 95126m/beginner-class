import {useState} from 'react'
import type { Todo } from '../App'
export default function TodoItem({
    todo,
    setTodo
}: {
    todo: Todo
    setTodo: (updatedTodo: Todo) => void    
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
                apikey: '5X8Z1k7M2vU5Q',
                username: 'Grepp_KDT4_ParkYoungWoong'
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
    async function deleteTodo() {
        await fetch(
            `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`, 
            {
            method: 'DELETE',
            headers: { 
                'content-type': 'application/json',
                apikey: '5X8Z1k7M2vU5Q',
                username: 'Grepp_KDT4_ParkYoungWoong'
                }
            }
        )
        // 목록 갱신
    }

    return (
        <li>
            {todo.title}
            <input
                value={title}
                onChange={e => setTitle(e.target.value)} 
                onKeyDown={keydownHandler} 
            />
            <button onClick={deleteTodo}>삭제</button>
        </li>
    )
}