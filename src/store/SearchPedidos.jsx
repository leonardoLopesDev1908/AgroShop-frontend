import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom"
import { Form, Button } from "react-bootstrap";
import { setId, setEmail, setDataInicio, setDataFim } from "../store/features/filtersPedidoSlices";
import { searchPedidos } from "../component/services/PedidoService";
import { toast } from "react-toastify";
import {formatarData} from "../component/utils/utils"

const SearchPedido = () => {
    const dispatch = useDispatch();
    const filterPedidos = useSelector((state) => state.filterPedidos);
    const [localEmail, setLocalEmail] = useState("");
    const [localPedidoId, setLocalPedidoId] = useState("");
    const [localDataInicio, setLocalDataInicio] = useState("");
    const [localDataFim, setLocalDataFim] = useState("");
    const [pedidos, setPedidos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const handleFilters = (e) => {
        e.preventDefault();
        dispatch(setEmail(localEmail.trim()));
        dispatch(setId(localPedidoId.trim()));
        dispatch(setDataInicio(localDataInicio || ""));
        dispatch(setDataFim(localDataFim || ""));
        setCurrentPage(0);
    };

    function buildQuery(filterPedidos, page) {
        const params = new URLSearchParams();
        if (!filterPedidos) return `pagina=${page}`;
        if (filterPedidos.id) params.append("id", filterPedidos.id);
        if (filterPedidos.email) params.append("email", filterPedidos.email);
        if (filterPedidos.dataInicio) params.append("dataInicio", filterPedidos.dataInicio);
        if (filterPedidos.dataFim) params.append("dataFim", filterPedidos.dataFim);
        params.append("pagina", page);
        return params.toString(); 
    }

    useEffect(() => {
        console.log("useEffect triggered — filters:", filterPedidos, "currentPage:", currentPage);
        console.log("CurrentPedidos: ", currentPedidos)
        const fetchPedidos = async () => {
            try {
                const query = buildQuery(filterPedidos, currentPage);
                console.log("Query:", query);
                
                const response = await searchPedidos(query);
                
                setPedidos(response.data);
            } catch (error) {
                console.error("Erro ao buscar pedidos:", error);
                toast.error(error.message || "Erro ao carregar pedidos");
            }
        };
        fetchPedidos();
    }, [filterPedidos, currentPage]);
    
    const totalItems = Array.isArray(pedidos) ? pedidos.length : 0;
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentPedidos = Array.isArray(pedidos) ? pedidos.slice(indexOfFirst, indexOfLast) : [];

    return (
        <div className="pesquisa-page">
        <h2>Pesquisa de Pedidos</h2>

        <div className="pesquisa-container">
            <Form className="pesquisa-form" onSubmit={handleFilters}>
            <div className="pesquisa-linha">
                <Form.Group className="mb-3">
                    <Form.Label>Email do usuário</Form.Label>
                    <Form.Control
                    type="email"
                    value={localEmail}
                    onChange={(e) => setLocalEmail(e.target.value)}
                    placeholder="Digite o email"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>ID do Pedido</Form.Label>
                    <Form.Control
                    type="text"
                    value={localPedidoId}
                    onChange={(e) => setLocalPedidoId(e.target.value)}
                    placeholder="Digite o ID do pedido"
                    />
                </Form.Group>
            </div>
            <div className="pesquisa-linha">
                <Form.Group className="mb-3">
                    <Form.Label>Data Inicial</Form.Label>
                    <Form.Control
                    type="date"
                    value={localDataInicio}
                    onChange={(e) => setLocalDataInicio(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Data Final</Form.Label>
                    <Form.Control
                    type="date"
                    value={localDataFim}
                    onChange={(e) => setLocalDataFim(e.target.value)}
                    />
                </Form.Group>
            </div>
            <Button variant="primary" type="submit" className="w-100">
                Pesquisar
            </Button>
            </Form>
        </div>

        <div className="pesquisa-list">
            <h3>Pedidos</h3>
                    {pedidos.length > 0 ? (
                        <ul>
                        {pedidos.map((pedido) => (
                            <Link to={`/pedido/${pedido.id}`} className="pesquisa-link">
                                <li key={pedido.id}>
                                <strong>Pedido:</strong> {pedido.id} | <strong>Usuário:</strong> {pedido.usuario?.email} |{" "}
                                <strong>Data:</strong> {formatarData(pedido.data)} | {" "}
                                <strong>Status: </strong> {pedido.status}
                                </li>
                            </Link>
                        ))}
                        </ul>
                    ) : (
                        <p>Nenhum resultado encontrado.</p>
                    )}
        </div>

            {totalItems > itemsPerPage && (
            <div className="pagination mt-3">
                {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, index) => (
                <Button
                    key={index}
                    variant={currentPage === index + 1 ? "dark" : "outline-dark"}
                    size="sm"
                    className="me-1"
                    onClick={() => setCurrentPage(index + 1)}
                >
                    {index + 1}
                </Button>
                ))}
            </div>
            )}
    </div>
  );
};

export default SearchPedido;
