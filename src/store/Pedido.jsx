import React, {useEffect, useState} from "react"
import { cancelarPedido, getPedidos } from "../component/services/PedidoService";
import {Link} from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import ProductImage from "../component/utils/ProductImage"

const Pedido = () => {
    const {user} = useAuth();
    const[pedidos, setPedidos] = useState([])
    const[loading, setLoading] = useState(true)
    const[error, setError] = useState("")
    
    useEffect(() => {
        const fetchPedidos = async () => {
            try{   
                const data = await getPedidos();
                setPedidos(data.data);
                console.log("Pedidos: ", data.data)
            }catch(error){
                console.error("Erro ao buscar pedidos: " + error.message)
                setError(error.message)
            }finally {
                setLoading(false)
            }
        };
        fetchPedidos();
    }, [user])

    function createSlug(name) {
        return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    }

    return (
        <div className="order-page">
            <div className="order-details">
                <div className="order-title">Seus pedidos</div>

                {error && <h6>{error}</h6>}

                {Array.isArray(pedidos) && pedidos.length > 0 ? (
                pedidos.map((pedido, index) => (
                    <div key={index} className="order-block">
                    <h5>Pedido #{pedido.id}</h5>
                    <p>Data: {pedido.data}</p>
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
                            <p>
                                Total item:{" "}
                                <strong>
                                R$ {(item.quantidade * item.produto.preco).toFixed(2)}
                                </strong>
                            </p>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                ))
                ) : (
                    <h6>Nenhum pedido encontrado</h6>
                )}
            </div>
        </div>

    );
} 

export default Pedido;