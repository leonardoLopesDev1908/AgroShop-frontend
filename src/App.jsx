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
import FormProdutos from "./store/features/FormProdutos"
import Pedidos from "./store/Pedidos"
import Management from "./component/utils/Management"
import SearchPedido from "./store/SearchPedidos"
import PedidoDetalhes from "./store/PedidoDetalhes"
import SearchProduto from "./store/SearchProduto"

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
        <Route path="/gerenciamento" element={<Management/>}/>
        <Route path="/cadastro-produto" element={<FormProdutos/>}/>
        <Route path="/pesquisa-pedidos" element={<SearchPedido/>}/>
        <Route path="/pedidos" element={<Pedidos/>}/>
        <Route path="/pedido/:id" element={<PedidoDetalhes/>}/>
        <Route path="/pesquisa-produto" element={<SearchProduto/>}/>
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
