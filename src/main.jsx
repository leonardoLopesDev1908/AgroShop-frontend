import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import './css/home.css'
import './css/produto.css'
import './css/perfil.css'
import './css/login.css'
import './css/cadastro.css'
import './css/footer.css'
import './css/nav.css'
import './css/cart.css'
import './css/order.css'
import './css/management.css'
import './css/dashboard.css'
import './css/App.css'
import './css/pagamento.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import {Provider} from "react-redux"
import {store} from "./store/store.js"
import ErrorBoundaryClass from "./component/error/ErrorBoundary.jsx"
import {AuthProvider} from './auth/AuthContext.jsx'
import { CarrinhoProvider } from './store/CarrinhoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ErrorBoundaryClass>
        <CarrinhoProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </CarrinhoProvider>
      </ErrorBoundaryClass>
    </AuthProvider>
  </StrictMode>,
)
