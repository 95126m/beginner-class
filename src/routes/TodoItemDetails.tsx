import { motion } from 'framer-motion'
import TodoItemModal from '@/components/TodoItemModal';

export default function TodoItemDetails() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <TodoItemModal />
        </motion.div>
    )
}

// transform: translateX(500px);
// x: 500
// 위 두개는 같은 것