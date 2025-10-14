import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import {Provider} from "react-redux"
import {store} from "./store/store.js"
import ErrorBoundaryClass from "./component/error/ErrorBoundary.jsx"
import AuthProvider from './auth/AuthContext.jsx'
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
