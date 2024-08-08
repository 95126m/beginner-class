import { useNavigate, useParams } from 'react-router-dom'
import styles from './TodoItemModal.module.css'

export default function TodoItemModal() {
    const navigate = useNavigate()
    const { todoId } = useParams()

    function offModal() {
        navigate('/')
    }

    return (
        <div className={styles.modal}>
            <div className={styles.overlay} onClick={offModal}></div>
            <div className={styles.contents}>
                <h2>Hello world!</h2>
                <h3>Todo ID: {todoId}</h3>
            </div>
        </div>
    )
}