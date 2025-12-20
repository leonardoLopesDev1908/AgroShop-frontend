import { React, useState, useEffect } from "react";
import {initMercadoPago, Wallet} from "@mercadopago/sdk-react"
import { Link, useNavigate } from "react-router-dom";
import {Card} from "react-bootstrap"
import { useCart } from "../../store/CarrinhoContext";
import {
  getItensCarrinho,
  removeItemFromCart,
  clearCarrinho,
  updateCarrinho,
} from "../../services/CarrinhoService";
import { useAuth } from "../../auth/AuthContext";
import ProductImage from "../../component/product/ProductImage";
import lixeira from "../../assets/imagens/lixeira-de-reciclagem.png";
import { fazerPedido } from "../../services/PedidoService";
import {createSlug} from "../../component/utils/utils"
import { getOutrosProdutos } from "../../services/ProdutoService";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import {calculaFreteItens} from "../../services/FreteService"
import {getEnderecos} from "../../services/UserService"


const Carrinho = () => {
    const { clearCarrinhoContagem, removeFromCarrinho } = useCart();
    const navigate = useNavigate();
    const {user, loadingUser} = useAuth();
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalItens, setTotalItens] = useState(0)
    const [fretes, setFretes] = useState([])
    const [enderecos, setEnderecos] = useState([])
    const [enderecoEntrega, setEnderecoEntrega] = useState(null)
    const [freteSelecionado, setFreteSelecionado] = useState(null)
    const [cepDestino, setCepDestino] = useState("")
    const [outros, setOutros] = useState([])
    const [message, setMessage] = useState("");

    if(loadingUser){
        return <p>Carregando dados...</p>
    }

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
                console.log(data)
                const outrosProdutos = await getOutrosProdutos(data[0].product.category.nome);

               const filtrados = outrosProdutos.filter(p => {
                    return !data.some(item => item.product.id === p.id);
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

    useEffect(() => {
    const fetchEnderecos = async () => {
        try {
        const response = await getEnderecos();
        setEnderecos(response.data || []);
        } catch (error) {
        setError(error.message);
        } finally {
        setLoading(false);
        }
    };
    fetchEnderecos();
    }, []);

    const handleExcluirProduto = async (item) => {
        setLoading(true);
        try {
            await removeItemFromCart(item.product.id);
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
        i.product.id === item.product.id
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        );
        setItens(novosItens);
    };

    const handleDiminuirQuantidade = (item) => {
        const novosItens = itens.map((i) =>
        i.product.id === item.product.id && i.quantidade > 1
            ? { ...i, quantidade: i.quantidade - 1 }
            : i
        );
        setItens(novosItens);
    };

    const handleMudarQuantidade = (item, novaQuantidade) => {
        const quantidade = Math.max(1, Number(novaQuantidade));
        const novosItens = itens.map((i) =>
        i.product.id === item.product.id ? { ...i, quantidade } : i
        );
        setItens(novosItens);
    };

    const limparCarrinho = async () => {
        try {
            await clearCarrinho();
            setItens([]);
            clearCarrinhoContagem();
        } catch (err) {
            console.error("Erro ao limpar carrinho:", err);
            throw err; 
        }
    };

    const criarPedido = async () => {
        setLoading(true);
        try {
            for (const item of itens) {
                await updateCarrinho(item.product.id, item.quantidade);
            }
            
            const response = await fazerPedido(freteSelecionado, enderecoEntrega);
            const pedidoId = response.data.data.id

            if (response && response.success !== false) {
                await limparCarrinho();
                setMessage("Pedido feito com sucesso!");
                console.log(response.data.data)
                navigate(`/pagamento/${pedidoId}`)
            } else {
                setMessage("Falha ao processar pedido");
            }
        } catch (error) {
            setMessage("Erro ao fazer pedido: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGetFrete = async() => {
        setLoading(true)
        try{
            const response = await calculaFreteItens(cepDestino)
            setFretes(response.data)
        }catch(error){
            setError(error.message)
        } finally{
            setLoading(false)
        }
    }

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
            <div className="left-column">
                <div className="cart-details">
                    <div className="cart-title">Seu carrinho</div>
                    <div className="cart-items">
                        {itens.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div>
                                <h6>{item.product.nome}</h6>
                                <Link
                                to={`/produtos/produto/${item.product.id}/${createSlug(
                                    item.product.nome
                                )}`}
                                >
                                {item.product?.imagens?.length > 0 && (
                                    <ProductImage productId={item.product.imagens[0].id} />
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
                <div className="second-line">
                    <div className="frete-details">
                        <label htmlFor="cep"><strong>Frete e prazo:</strong> </label>
                        <input
                            type="text"
                            id="cep"
                            placeholder="Digite o CEP"
                            onChange={(e) => {setCepDestino(e.target.value)}}
                        />
                        <button
                            type="button"
                            className=""
                            onClick={handleGetFrete}>
                            Buscar
                        </button>
                        <div>
                            {fretes && fretes.map((frete) => {
                                return (
                                    <div
                                        key={frete.id}
                                        className="fretes"
                                        onClick={() => setFreteSelecionado(frete)}
                                    >
                                        <img className="img-frete" src={frete.company.picture} /> -
                                        <strong>R$ {Number(frete.price).toFixed(2)}</strong>
                                        até {frete.delivery_time} dias
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="enderecos">
                        <strong><p>Selecione o endereço de entrega: </p></strong>
                        {enderecos.length === 0 ? (
                            <p className="text-muted">Nenhum endereço cadastrado ainda.</p>
                        ) : (
                            <div className="enderecos-grid">
                            {enderecos.map((end, index) => (
                                <div 
                                key={index} 
                                className={`endereco-card ${enderecoEntrega === end ? 'selecionado' : ''}`}
                                onClick={() => setEnderecoEntrega(end)}
                                >
                                <div 
                                    className={`confirmacao ${enderecoEntrega === end ? 'selecionada' : ''}`}
                                ></div>
                                <p><strong>Rua:</strong> {end.endereco}</p>
                                <p><strong>Número:</strong> {end.numero}</p>
                                <p><strong>Bairro:</strong> {end.bairro}</p>
                                <p><strong>Cidade:</strong> {end.cidade}</p>
                                <p><strong>UF:</strong> {end.estado}</p>
                                <p><strong>CEP:</strong> {end.cep}</p>
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="confirmar-container">
                <div>
                    {itens.length > 0 && freteSelecionado && (
                        <button
                        className="order-cart"
                        onClick={criarPedido}
                        disabled={loading}
                        >
                        {loading ? "Processando..." : "Finalizar pedido"}
                        </button>
                    )}
                </div>
                <div>
                    <p>Subtotal: R$ {totalItens.toFixed(2)}</p>
                    {freteSelecionado &&(
                        <p>Frete: R$ {Number(freteSelecionado.price).toFixed(2)}</p>
                    ) || (
                        <p>Frete: R$ -</p>
                    )}
                    <p>Descontos: R$ -</p>
                    <strong>
                        <p>
                            Total: R$ {
                                (freteSelecionado?.price
                                    ? totalItens + Number(freteSelecionado.price)
                                    : totalItens
                                ).toFixed(2)
                            }
                        </p>
                    </strong>
                </div>
            </div>
        </div>
            <h2 style={{marginBottom: "0"}}>Veja também</h2>
            <Slider {...settings} className="lista-produtos-sec">
                {outros.map((product) => (
                    <div className="produto-sec" key={product.id}>
                        <Card className="produto-card">
                            <Link to={`/produtos/produto/${product.id}/${createSlug(product.nome)}`}>
                                <div className="image-container">
                                    {product.imagens?.length ? (
                                    <ProductImage productId={product.imagens[0].id} />
                                    ) : (
                                    <div className="text-center p-5">Sem imagem</div>
                                    )}
                                </div>
                            </Link>
                            <Card.Body>
                                <p className="produto-description"><strong>{product.nome}</strong></p>
                                <h4 className="price">R$ {product.preco.toFixed(2).replace('.', ',')}</h4>
                                <Link to={`/produtos/produto/${product.id}/${createSlug(product.nome)}`}>
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
