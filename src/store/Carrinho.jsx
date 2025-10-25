import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CarrinhoContext";
import {
  getItensCarrinho,
  removeItemFromCart,
  clearCarrinho,
  updateCarrinho,
} from "../component/services/CarrinhoService";
import { useAuth } from "../auth/AuthContext/";
import ProductImage from "../component/utils/ProductImage";
import lixeira from "../assets/imagens/lixeira-de-reciclagem.png";
import { fazerPedido } from "../component/services/PedidoService";

const Carrinho = () => {
    const { clearCarrinhoContagem, removeFromCarrinho } = useCart();
    const { user } = useAuth();
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchItens = async () => {
            try {
                const data = await getItensCarrinho();
                setItens(data);
            } catch (error) {
                console.error("Erro ao buscar itens:", error.message);
            } finally {
                setLoading(false);
            }
        }; 
        fetchItens();
    }, [user]);

    function createSlug(name) {
        return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    }

    const handleExcluirProduto = async (item) => {
        setLoading(true);
        try {
            await removeItemFromCart(item.produto.id);
            removeFromCarrinho(item.quantidade); 
            const data = await getItensCarrinho();
            setItens(data);
        } catch (error) {
            console.error("Erro ao remover produto:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAumentarQuantidade = (item) => {
        const novosItens = itens.map((i) =>
        i.produto.id === item.produto.id
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        );
        setItens(novosItens);
    };

    const handleDiminuirQuantidade = (item) => {
        const novosItens = itens.map((i) =>
        i.produto.id === item.produto.id && i.quantidade > 1
            ? { ...i, quantidade: i.quantidade - 1 }
            : i
        );
        setItens(novosItens);
    };

    const handleMudarQuantidade = (item, novaQuantidade) => {
        const quantidade = Math.max(1, Number(novaQuantidade));
        const novosItens = itens.map((i) =>
        i.produto.id === item.produto.id ? { ...i, quantidade } : i
        );
        setItens(novosItens);
    };

    const limparCarrinho = async () => {
        try {
            console.log("Entrou no limparCarrinho()");
            await clearCarrinho();
            console.log("clearCarrinho() feito");
            setItens([]);
            console.log("setItens([])");
            clearCarrinhoContagem();
            console.log("clearCarrinhoContagem() feito");
        } catch (err) {
            console.error("Erro ao limpar carrinho:", err);
            throw err; 
        }
    };

    const confirmarPedido = async () => {
        setLoading(true);
        try {
            for (const item of itens) {
                await updateCarrinho(item.produto.id, item.quantidade);
                console.log("Produto atualizado:", item.produto.id);
            }
            
            const response = await fazerPedido();
            console.log("Pedido feito, response:", response);
            
            if (response && response.success !== false) {
                console.log("Entrando no limparCarrinho...");
                await limparCarrinho();
                console.log("Carrinho limpo com sucesso");
                setMessage("Pedido feito com sucesso!");
            } else {
                console.log("Response inválido ou falhou:", response);
                setMessage("Falha ao processar pedido");
            }
        } catch (error) {
            console.error("Erro ao fazer pedido: ", error.message);
            setMessage("Erro ao fazer pedido: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
        <div className="cart-page loading-state">
            <div className="spinner"></div>
            <p>Carregando carrinho...</p>
        </div>
        );
    }

    if (!itens.length) {
        return (
        <div className="cart-page empty-state">
            <p>Seu carrinho está vazio.</p>
        </div>
        );
    }

    return (
        <div className="cart-page">
        <div className="cart-details">
            <div className="cart-title">Seu carrinho</div>
            <div className="cart-items">
            {itens.map((item, index) => (
                <div key={index} className="cart-item">
                <div>
                    <h6>{item.produto.nome}</h6>
                    <Link
                    to={`/produtos/produto/${item.produto.id}/${createSlug(
                        item.produto.nome
                    )}`}
                    >
                    {item.produto?.imagens?.length > 0 && (
                        <ProductImage productId={item.produto.imagens[0].id} />
                    )}
                    </Link>
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
                        onChange={(e) =>
                            handleMudarQuantidade(item, e.target.value)
                        }
                    />
                    <button onClick={() => handleAumentarQuantidade(item)}>
                        +
                    </button>
                    </div>
                    <p>
                    Total:{" "}
                    <strong>
                        R$ {(item.quantidade * item.precoUnitario).toFixed(2)}
                    </strong>
                    </p>
                    <button
                    className="btn-excluir"
                    onClick={() => handleExcluirProduto(item)}
                    >
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
        {itens.length > 0 ? (
            <button
            className="order-cart"
            onClick={confirmarPedido}
            disabled={loading}
            >
            {loading ? "Processando..." : "Fazer pedido"}
            </button>
        ) : (
            <h6>{message}</h6>
        )}
        </div>
    );
};

export default Carrinho;
