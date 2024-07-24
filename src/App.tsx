// 기본 내보내기 : default 붙은 거, 이름 내보내기
// - eslint-disable-next-line (무시하는 방법이 있긴 한데 비추)

import { useState } from 'react' // useState 를 리액트의 속성에서 가지고옴
export default function App() {
  // 데이터
  // useState = Hook
  // 구조 분해 할당
  const [users, setUsers] = useState([
    { name: 'Neo', age: 51 }, 
    { name: 'Lewis', age: 22 },
    { name: 'Evan', age: 18 }
  ])
  const [count, setCount] = useState(31)
  function increase() {
    setCount (count + 1)
  }
  return (
    // 화면
    // Flagment : <></>
    <>
      <div>
        {count}명
      </div>
      <button onClick={increase}>증가</button>
      <ul>
        {users.map(user => (
          <li key={user.name}>
            {user.name}
          </li>
        ))}
      </ul>
    </>
  )
}

// 반응성 (데이터의 변경에 화면이 같이 변경된다) → 반응형 데이터
// 모던 프레임워크 (React, Vue, Angular) 정체성