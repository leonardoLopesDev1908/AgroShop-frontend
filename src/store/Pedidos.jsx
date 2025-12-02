import React, {useEffect, useState} from "react"
import { cancelarPedido, getPedidos } from "../component/services/PedidoService";
import {Link} from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import ProductImage from "../component/utils/ProductImage"
import {createSlug, formatarData} from "../component/utils/utils"
import lupa from "../assets/imagens/lupa.png"

const Pedidos = () => {
    const {user} = useAuth();
    const[pedidos, setPedidos] = useState([])
    const[pedidosOriginais, setPedidosOriginais] = useState([])
    const[status, setStatus] = useState("")
    const[loading, setLoading] = useState(true)
    const[error, setError] = useState("")
    
    useEffect(() => {
        const fetchPedidos = async () => {
            try{   
                const data = await getPedidos();
                setPedidos(data.data);
                setPedidosOriginais(data.data)
                setLoading(false)
            }catch(error){
                console.error("Erro ao buscar pedidos: " + error.message)
                setError(error.message)
            }finally {
                setLoading(false)
            }
        };
        fetchPedidos();
    }, [user])

    const handleFiltrar = () => {
        if (status === "") {
            setPedidos(pedidosOriginais)
        } else {
            const pedidosFiltrados = pedidosOriginais.filter(
                (p) => p.status === status
            );
            setPedidos(pedidosFiltrados);
        }
    };

    return (
        <div className="order-page">
            <div className="order-details">
                <div className="title-line">
                    <div className="order-title">
                        Seus pedidos
                    </div>
                    <div className="order-filters">
                        <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">TODOS</option>
                        <option value="PENDENTE">PENDENTE</option>
                        <option value="CONFIRMADO">CONFIRMADO</option>
                        <option value="PROCESSANDO">PROCESSANDO</option>
                        <option value="ENVIADO">ENVIADO</option>
                        <option value="ENTREGUE">ENTREGUE</option>
                        <option value="CANCELADO">CANCELADO</option>
                        </select>
                        <button
                            className="btn-voltar"
                            onClick={handleFiltrar}
                        >
                            <img src={lupa} alt="Filtrar"/>
                            {/* https://www.flaticon.com/br/autores/freepik */}
                        </button>
                    </div>
                </div>
                {error && <h6>{error}</h6>}

             {Array.isArray(pedidos) && pedidos.length > 0 ? (
                pedidos
                    .slice()
                    .sort((a, b) => b.id - a.id)
                    .map((pedido, index) => (
                    <div key={index} className="order-block">
                        <h5>Código do Pedido: {pedido.id}</h5>
                        <p>Data: {formatarData(pedido.data)}</p>
                        <p>Status: {pedido.status}</p>
                        <div className="order-items">
                        {pedido.itens.map((item, i) => (
                            <div key={i} className="order-item">
                                <div className="order-item-info">
                                    <h6>{item.produto.nome}</h6>
                                    <Link
                                    to={`/produtos/produto/${item.produto.id}/${createSlug(item.produto.nome)}`}
                                    >
                                    {item.produto?.imagens?.length > 0 && (
                                        <ProductImage productId={item.produto.imagens[0].id} />
                                    )}
                                    </Link>
                                </div>

                            <div className="order-item-details">
                                <p>Preço unitário: R$ {item.produto.preco.toFixed(2)}</p>
                                <p>Quantidade: {item.quantidade}</p>
                                <p>Frete: R$ {pedido.frete}</p>
                                <p>
                                Total item:{" "}
                                <strong>
                                    R$ {((item.quantidade * item.produto.preco) + pedido.frete).toFixed(2)}
                                </strong>
                                </p>
                            </div>
                            </div>
                        ))}
                        </div>
                            {["PENDENTE", "CONFIRMADO", "PROCESSANDO"].includes(pedido.status) && (
                            <button
                                className="btn-cancelar"
                                style={{ backgroundColor: "#d9534f", color: "white" }}
                                onClick={async () => {
                                if (window.confirm("Deseja realmente cancelar este pedido?")) {
                                    try {
                                        await cancelarPedido(pedido.id); 
                                        alert("Pedido cancelado com sucesso!");
                                    } catch (err) {
                                        alert("Erro ao cancelar pedido: " + err.message);
                                    }
                                }
                                }}
                            >
                                Cancelar Pedido
                            </button>
                            )}
                        </div>
                        ))
                    ) : (
                    <h6>Nenhum pedido encontrado</h6>
                    )}
            </div>
        </div>

    );
} 

export default Pedidos;