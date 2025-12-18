import {Route, 
        RouterProvider, 
        createBrowserRouter, 
        createRoutesFromElements
    } from "react-router-dom" 
import RootLayout from "./component/layout/RootLayout"
import Home from './pages/Home'
import Login from './pages/user/Login'
import NotFound from "./component/error/NotFound"
import Cadastro from './pages/cadastros/Cadastro'
import Carrinho from "./pages/user/Carrinho"
import Produto from "./component/product/Produto"
import FormProdutos from "./pages/cadastros/FormProdutos"
import Pedidos from "./pages/user/Pedidos"
import Management from "./component/utils/Management"
import SearchPedido from "./pages/pesquisas/SearchPedidos"
import PedidoDetalhes from "./store/PedidoDetalhes"
import SearchProduto from "./pages/pesquisas/SearchProduto"
import PerfilUsuario from "./pages/user/PerfilUsuario"
import Dashboard from "./component/utils/Dashboard"
import OAuth2RedirectHandler from "./auth/OAuth2RedirectHandler"
import Pagamento from "./pages/user/Pagamento"
import Failure from "./pages/user/pos-pagamento/Failure"
import Pending from "./pages/user/pos-pagamento/Pending"
import Success from "./pages/user/pos-pagamento/Failure"


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="/carrinho" element={<Carrinho/>}/>
        <Route path="/produtos/produto/:id/:nome" element={<Produto />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/gerenciamento" element={<Management/>}/>
        <Route path="/cadastro-produto" element={<FormProdutos/>}/>
        <Route path="/pesquisa-pedidos" element={<SearchPedido/>}/>
        <Route path="/pedidos" element={<Pedidos/>}/>
        <Route path="/pedido/:id" element={<PedidoDetalhes/>}/>
        <Route path="/pesquisa-produto" element={<SearchProduto/>}/>
        <Route path="/conta" element={<PerfilUsuario/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/pagamento/:pedidoId" element={<Pagamento/>}/>
        <Route path="/payment/success" element={<Success/>}/>
        <Route path="/payment/pending" element={<Pending/>}/>
        <Route path="/payment/failure" element={<Failure/>}/>

        <Route path="*" element={<NotFound/>}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}

export default App
