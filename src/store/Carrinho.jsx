import {React, useState, useEffect} from "react"
import { useCart } from "./CarrinhoContext"
import { getItensCarrinho, removeItemFromCart, clearCarrinho } from "../component/services/ProdutoService"
import { useAuth } from "../auth/AuthContext/"
import ProductImage from '../component/utils/ProductImage'
import lixeira from "../assets/imagens/lixeira-de-reciclagem.png"

const Carrinho = () => {
    const { clearCarrinhoContagem } = useCart()
    const {user} = useAuth()
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
    
    const handleExcluirProduto = async (item) => {
        setLoading(true);
        try {
            await removeItemFromCart(item.produto.id);
            const data = await getItensCarrinho(); 
            setItens(data);
            alert("Produto removido do carrinho");
        } catch (error) {  
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAumentarQuantidade = (item) => {
        const novosItens = itens.map((i) =>
            i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
        setItens(novosItens);
    };

    const handleDiminuirQuantidade = (item) => {
        const novosItens = itens.map((i) => 
            i.id === item.id && i.quantidade > 1 
                ? {...i, quantidade: i.quantidade - 1}
                : i
        )
        setItens(novosItens)
    }

    const handleMudarQuantidade = (item, novaQuantidade) => {
        const quantidade = Math.max(1, Number(novaQuantidade));
        const novosItens = itens.map((i)=> 
            i.id === item.id ? {...i, quantidade} : i
        );
        setItens(novosItens)
    }

    const limparCarrinho = async () => {
        setLoading(true)
        try{
            await clearCarrinho();
            clearCarrinhoContagem()
            setItens([]);
        }catch(error){
            console.error("Erro ao limpar o carrinho: ", error.message)
        }finally{
            setLoading(false)
        }
    };

    if (loading) {
        return (
            <div className="cart-page loading-state">
                <div className="spinner"></div>
                <p>Carregando carrinho...</p>
            </div>
        )
    }

    if (!itens.length) {
        return (
            <div className="cart-page empty-state">
                <p>Seu carrinho está vazio.</p>
            </div>
        )
    }

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
                            <h6>{item.produto.nome}</h6>
                            {item.produto && item.produto.imagens && item.produto.imagens.length > 0 && (
                                <ProductImage productId={item.produto.imagens[0].id} />
                            )}
                        </div>
                        <div className="cart-item-details">
                            <p>R$ {item.precoUnitario.toFixed(2)}</p>
                            <div className="quantity-control">
                                <button
                                    onClick={() => handleDiminuirQuantidade(item)}
                                    disabled={item.quantidade <= 1}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantidade}
                                    onChange={(e) => handleMudarQuantidade(item, e.target.value)}
                                />
                                <button onClick={() => handleAumentarQuantidade(item)}>+</button>
                            </div>
                            <p>Total: <strong>R$ {(item.quantidade * item.precoUnitario).toFixed(2)}</strong></p>
                            <button className="btn-excluir" onClick={() => handleExcluirProduto(item)}>
                                <img src={lixeira} alt="Excluir" />
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