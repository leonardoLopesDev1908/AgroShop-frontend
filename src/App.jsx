import {Route, 
        RouterProvider, 
        createBrowserRouter, 
        createRoutesFromElements
    } from "react-router-dom" 
import RootLayout from "./component/layout/RootLayout"
import Home from './home/Home'
import Profile from './profile/Profile'
import Login from './profile/Login'
import NotFound from "./component/error/NotFound"
import Cadastro from "./profile/Cadastro"
import Carrinho from "./store/Carrinho"
import Produto from "./component/utils/Produto"


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="/conta" element={<Profile/>}/>
        <Route path="/carrinho" element={<Carrinho/>}/>
        <Route path="/produtos/produto/:id/:nome" element={<Produto />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
