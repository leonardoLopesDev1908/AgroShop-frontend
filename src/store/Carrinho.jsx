import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Card} from "react-bootstrap"
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
import {createSlug} from "../component/utils/utils"
import { getOutrosProdutos } from "../component/services/ProdutoService";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import {calculaFreteItens} from "../component/services/FreteService"

const Carrinho = () => {
    const { clearCarrinhoContagem, removeFromCarrinho } = useCart();
    const { user } = useAuth();
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalItens, setTotalItens] = useState(0)
    const [frete, setFrete] = useState(15)
    const [cepDestino, setCepDestino] = useState("")
    const [outros, setOutros] = useState([])
    const [message, setMessage] = useState("");

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "20px",
        arrows: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    useEffect(() => {
        const fetchItens = async () => {
            try {
                const data = await getItensCarrinho();
                setItens(data);

                const outrosProdutos = await getOutrosProdutos(data[0].produto.categoria.nome);

                console.log("Itens: ", data);
                console.log("Produto: ", outrosProdutos)
               const filtrados = outrosProdutos.filter(p => {
                    return !data.some(item => item.produto.id === p.id);
                });
                setOutros(filtrados)
                
                const total = data.reduce((acumulator, item) => {
                    return acumulator + item.preco
                })

            } catch (error) {
                console.error("Erro ao buscar itens:", error.message);
            } finally {
                setLoading(false);
            }
        }; 
        fetchItens();
    }, [user]);

    useEffect(() => {
        const total = itens.reduce(
            (soma, item) => soma + item.precoUnitario * item.quantidade,
            0
        );
        setTotalItens(total);
    }, [itens]);

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
        console.log(item)
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
            await clearCarrinho();
            setItens([]);
            clearCarrinhoContagem();
            console.log("clearCarrinhoContagem() feito");
        } catch (err) {
            console.error("Erro ao limpar carrinho:", err);
            throw err; 
        }
    };

    const handleFrete = async() => {
        try{
            const response = await calculaFreteItens(cepDestino)
            setFretes(response.data)
            console.log(response.data)
        } catch(error){
            setError(error.message)
        } 
    }

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
        <div className="carrinho-info"> 
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
            <div className="confirmar-container">
                <div>
                    {itens.length > 0 ? (
                        <button
                        className="order-cart"
                        onClick={confirmarPedido}
                        disabled={loading}
                        >
                        {loading ? "Processando..." : "Confirmar pedido"}
                        </button>
                    ) : (
                        <h6>{message}</h6>
                    )}
                </div>
                <div>
                    <p>Subtotal: R$ {totalItens.toFixed(2)}</p>
                    <p>Frete: R$ {frete.toFixed(2)}</p>
                    <p>Descontos: R$ -</p>
                    <strong>
                        <p>Total: R$ {(totalItens + frete).toFixed(2)}</p>
                    </strong>
                </div>
            </div>
        </div>
            <h2 style={{marginBottom: "0"}}>Veja também</h2>
            <Slider {...settings} className="lista-produtos-sec">
                {outros.map((produto) => (
                    <div className="produto-sec" key={produto.id}>
                        <Card className="produto-card">
                            <Link to={`/produtos/produto/${produto.id}/${createSlug(produto.nome)}`}>
                                <div className="image-container">
                                    {produto.imagens?.length ? (
                                    <ProductImage productId={produto.imagens[0].id} />
                                    ) : (
                                    <div className="text-center p-5">Sem imagem</div>
                                    )}
                                </div>
                            </Link>
                            <Card.Body>
                                <p className="produto-description"><strong>{produto.nome}</strong></p>
                                <h4 className="price">R$ {produto.preco.toFixed(2).replace('.', ',')}</h4>
                                <Link to={`/produtos/produto/${produto.id}/${createSlug(produto.nome)}`}>
                                    <button className="btn btn-primary w-100">Ver produto</button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </Slider>
        </div>
        
    );
    
};

export default Carrinho;
