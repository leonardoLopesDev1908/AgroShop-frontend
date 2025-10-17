import {React, useState, useEffect} from "react"
import { useCart } from "./CarrinhoContext"
import { getItensCarrinho } from "../component/services/ProdutoService"
import { useAuth } from "../auth/AuthContext/"
import ProductImage from '../component/utils/ProductImage'

const Carrinho = () => {
    const {user} = useAuth()
    const { removeFromCarrinho, clearCarrinho } = useCart()
    const [itens, setItens] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchItens = async () => {
            try{
                const data = await getItensCarrinho();
                setItens(data)
            }catch(error){
                console.error("Erro ao buscar itens:", error.message);
            } finally{
                setLoading(false)
            }
        }
        fetchItens();
    }, [user]);
    
    const handleExcluirProduto = (item) => {
        removeFromCarrinho(item.quantidade);
        setItens(prev => prev.filter(i => i.id !== item.id));
    }
    
    const limparCarrinho = () => {
        clearCarrinho();
        setItens([]);
    }
    
    if (!itens.length) return <p>Seu carrinho está vazio.</p>;
    if (loading) return <p>Carregando...</p>;
    
    return (
        <div className="cart-page">
            <div className="cart-details">
                <div className="cart-title">
                    Seu carrinho
                </div>
                <div className="cart-items">
                {itens.map((item, index) => (
                    <div key={index} className="cart-item">
                        <div>
                            <h5>{item.produto.nome}</h5>
                            <ProductImage productId={item.produto.imagens[0].id}/>
                        </div>
                        <div className="cart-item-details">
                            <p>R$ {item.precoUnitario.toFixed(2)}</p>
                            <p>{item.quantidade}x</p>
                            <p>Total: <strong>R$ {(item.quantidade * item.precoUnitario).toFixed(2)}</strong></p>
                            <button
                                className="btn-excluir"
                                onClick={() => handleExcluirProduto(item.id)}
                                >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
                {itens.length > 0 && (
                    <button className="btn-limpar" onClick={limparCarrinho}>
                        Limpar Carrinho
                    </button>
                )}
                </div>
            </div>
            <div className="order-cart">
                Fazer pedido
            </div>
        </div>
    )
}

export default Carrinho;