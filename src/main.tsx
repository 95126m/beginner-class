import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Router />
    </BrowserRouter>
)

