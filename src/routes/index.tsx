import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Main from './Main'
import TodoItemDetails from './TodoItemDetails'

export default function Index() {
  // location 객체는 현재 URL에 대한 정보를 가지고 있다
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname}>
        <Route
          path="/"
          element={<Main />}>
          <Route
            path={'/:todoId'}
            element={<TodoItemDetails />}>
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

// export const router = createBrowserRouter([
//     {
//         path: '/', // 메인페이지에 접근하면
//         element: <Main />, // 라는 문자(페이지)를 보여주겠다
//         children: [
//             {
//                 path: ':todoId', 
//                 element: <TodoItemDetails />
//             }
//         ]
//     }
// ])
