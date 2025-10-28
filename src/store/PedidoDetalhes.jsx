import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPedidoPorId, atualizarStatus, excluirPedido } from "../component/services/PedidoService"
import {formatarData} from "../component/utils/utils"

const PedidoDetalhes = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPedido = async () => {
      try {
        setLoading(true);
        const response = await getPedidoPorId(id);
        console.log(response.data)
        setPedido(response.data);
      } catch (err) {
        setError("Erro ao carregar os detalhes do pedido.");
      } finally {
        setLoading(false);
      }
    };
    fetchPedido();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!pedido) return <p>Pedido não encontrado.</p>;
  const totalPedido = pedido.itens?.reduce(
    (acc, item) => acc + item.quantidade * item.produto.preco,
    0
  );

  return (
    <div className="pedido-detalhes-page">
      <div className="pedido-header">
        <h2>Detalhes do Pedido #{pedido.id}</h2>
        <p><strong>Data:</strong> {formatarData(pedido.data)}</p>
        <p><strong>Status:</strong> {pedido.status}</p>
        <p><strong>Usuário:</strong> {pedido.usuario?.email}</p>
      </div>

      <div className="pedido-itens">
        <h3>Itens do Pedido</h3>
        {pedido.itens?.length > 0 ? (
          <ul>
            {pedido.itens.map((item, index) => (
              <li key={index} className="pedido-item">
                <div className="pedido-item-info">
                  <strong>{item.produto.nome}</strong>
                  <p>{item.produto.descricao}</p>
                  <p>Quantidade: {item.quantidade}</p>
                  <p>Preço unitário: R$ {item.produto.preco.toFixed(2)}</p>
                  <p>
                    Total:{" "}
                    <strong>
                      R$ {(item.quantidade * item.produto.preco).toFixed(2)}
                    </strong>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Este pedido não possui itens.</p>
        )}
      </div>

      <div className="pedido-total">
        <h3>Total do Pedido: R$ {totalPedido?.toFixed(2)}</h3>
      </div>

      <div style={{display:"flex", gap: "7vh"}}>

        <div className="pedido-voltar">
          <Link to="/pesquisa-pedidos" className="btn-voltar">← Voltar para lista</Link>
        </div>

        <div className="pedido-voltar">
         <select
            value={status || pedido.status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PENDENTE">PENDENTE</option>
            <option value="CONFIRMADO">CONFIRMADO</option>
            <option value="PROCESSANDO">PROCESSANDO</option>
            <option value="ENVIADO">ENVIADO</option>
            <option value="ENTREGUE">ENTREGUE</option>
            <option value="CANCELADO">CANCELADO</option>
          </select>
          <button
            className="btn-voltar"
            onClick={async () => {
              if (window.confirm("Tem certeza que deseja atualizar o status do pedido?")) {
                try {
                  const atualizado = await atualizarStatus(pedido.id, status);
                  setPedido((prev) => ({ ...prev, status: atualizado.status }));
                  alert("Status atualizado com sucesso!");
                } catch (err) {
                  alert("Erro ao atualizar status: " + err.message);
                }
              }
            }}
            >
            Atualizar status
          </button>
        </div>

        <div className="pedido-voltar">
          <button
            className="btn-voltar"
            style={{ backgroundColor: "#d9534f", color: "white" }}
            onClick={async () => {
              if (window.confirm("Tem certeza que deseja excluir este pedido? Esta ação não pode ser desfeita.")) {
                try {
                  await excluirPedido(pedido.id);
                  alert("Pedido excluído com sucesso!");
                  window.location.href = "/pesquisa-pedidos"; 
                } catch (err) {
                  alert("Erro ao excluir pedido: " + err.message);
                }
              }
            }}
            > Excluir pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default PedidoDetalhes;
