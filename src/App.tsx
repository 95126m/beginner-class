import { useState, useEffect } from 'react'
export interface Root {
  total: number
  users: User[]
}

export interface User {
  id: string
  name: string
  age: number
  isValid: boolean
  emails: string[]
  photo?: Photo
}

export interface Photo {
  name: string
  size: number
  mimeType: string
  url: string
}
import TheLoader from './components/TheLoader'

export default function App() { // 데이터, useState = Hook
  const [users, setUsers] = useState<User[]>([]) //never[]
  const [count, setCount] = useState(31)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  function increase() {
    setCount(count + 1)
  }
  // App 컴포넌트가 준비되었을 때 (Mount, 최초 랜더링), useEffect(콜백, 종속성배열- 의존성배열)
  useEffect(() => {
    getUsers()
  }, [])
  async function getUsers() { // 사용자를 가져와라
    try {
      await new Promise(resolve => setTimeout(resolve, 3000)) // 3초 기다린 후 실행
      const res = await fetch('https://api.heropy.dev/v0/users')
      const data = await res.json()
      console.log('응답결과', data)
      setUsers(data.users)
    } catch (error) {
      if (error instanceof Error) {
        const message = '서버가 폭발했어요'
        console.error('에러남', message)
        setMessage(message)
      }
    } finally {
      setLoading(false)
    }
  }
  return ( // 화면    
    <>
      <div>{count}명</div>
      <button onClick={increase}>증가</button>
      <div>{loading && <TheLoader />}</div>
      <div>{message}</div>
      <ul>
        {users.map(user => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul>
    </>
  )
}