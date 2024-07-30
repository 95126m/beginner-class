import {useState} from 'react'
import type { Todo } from '../App'
export default function UserItem({ abc }: { abc: Todo }) {
    const [title, setTitle] = useState(abc.title)
    function keydownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            console.log('서버로 전송', title)
            // await 서버로전송(수정할이름)
        }
    }
    return (
        <li>
        {abc.title}
            <input
                value={title}
                onChange={e => setTitle(e.target.value)} 
                onKeyDown={keydownHandler} 
            />
        </li>
    )
}