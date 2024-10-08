import clsx from 'clsx'
import { useTodosStore } from '@/stores/todos'
import styles from './TodoFilters.module.css'

export default function TodoFilters() {
  const filterStatus = useTodosStore(state => state.filterStatus)
  const filters = useTodosStore(state => state.filters)
  const setFilterStatus = useTodosStore(state => state.setFilterStatus)
  return (
    <>
      {filters.map(filter => (
        <button
          className={clsx(
            styles.btn,
            filterStatus === filter.value && styles.active
          )}
          key={filter.value}
          onClick={() => setFilterStatus(filter.value)}>
          {filter.text}
        </button>
      ))}
    </>
  )
}
