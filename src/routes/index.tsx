import { createBrowserRouter } from 'react-router-dom'
import Main from './Main'
import TodoItemDetails from './TodoItemDetails'

export const router = createBrowserRouter([
    {
        path: '/', // 메인페이지에 접근하면
        element: <Main />, // 라는 문자(페이지)를 보여주겠다
        children: [
            {
                path: ':todoId', // :id 도 가능, 동적 경로
                element: <TodoItemDetails />
            }
        ]
    }
])
