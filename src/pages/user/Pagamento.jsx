import React, { useState, useEffect } from "react";
import MercadoPagoButton from "../../component/utils/MercadoPagoButton";
import { getPedidoCompletoPorId } from "../../services/PedidoService";
import { useParams, Link } from "react-router-dom";
import { createSlug } from "../../component/utils/utils";

const Pagamento = () => {
    const { pedidoId } = useParams();

    const [pedido, setPedido] = useState(null);
    const [endereco, setEndereco] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPedido = async () => {
            try {
                const response = await getPedidoCompletoPorId(pedidoId);
                setPedido(response.data.pedido);
                setEndereco(response.data.endereco)
                console.log("Pedido recebido:", response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPedido();
    }, [pedidoId]);

    const calcularSubtotalItens = (pedido) => {
        if (!pedido?.itens) return 0;

        return pedido.itens.reduce((soma, item) => {
            const precoUnitario = Number(item.produto.preco) || 0;
            const quantidade = Number(item.quantidade) || 0;

            return soma + precoUnitario * quantidade;
        }, 0);
    };

    if (loading) return <p>Carregando pedido...</p>;
    if (error) return <p>Erro ao carregar pedido: {error}</p>;
    if (!pedido) return <p>Pedido não encontrado</p>;

    const subtotal = calcularSubtotalItens(pedido);
    const frete = Number(pedido.frete) || 0;
    const total = subtotal + frete;

    return (
        <div className="pedido-resumo">
            <h2>Resumo do Pedido #{pedidoId}</h2>

            <div className="produtos-resumo">
                <h3>Produtos:</h3>
                <ul>
                    {pedido.itens.map((item, index) => (
                        <li key={index} className="cart-item">
                            <div className="item-info">
                                <h6>{item.produto.nome}</h6>
                                <p>
                                    {item.quantidade} × R$ {Number(item.produto.preco).toFixed(2)}
                                </p>
                                <Link
                                    to={`/produtos/produto/${item.produto.id}/${createSlug(
                                        item.produto.nome
                                    )}`}
                                    className="item-link"
                                >
                                    Ver detalhes
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="valores-resumo">
                <div className="linha-valor">
                    <span>Subtotal:</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="linha-valor">
                    <span>Frete:</span>
                    <span>R$ {frete.toFixed(2)}</span>
                </div>
                <div className="linha-valor total">
                    <span>Total:</span>
                    <span>R$ {total.toFixed(2)}</span>
                </div>
            </div>

            <div className="entrega-resumo">
                <h3>Entrega:</h3>
                <p>
                    {endereco.endereco}, {endereco.numero}
                    {endereco.complemento && ` – ${endereco.complemento}`}
                    <br />
                    {endereco.bairro} – {endereco.cidade}/{endereco.estado}
                </p>
            </div>

            <div className="pagamento-resumo">
                <h3>Pagamento:</h3>
                <MercadoPagoButton pedidoId={pedidoId} />
            </div>
        </div>
    );
};

export default Pagamento;
