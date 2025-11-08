import React, { useState, useEffect } from "react";
import { Button, Form, Table, Spinner, Modal } from "react-bootstrap";
import {Link} from "react-router-dom"
import { toast } from "react-toastify";
import {
  getDistintosProdutosByNome,
  deleteProduto,
  updateProduto,
  uploadImage,
} from "../component/services/ProdutoService";
import ProductImage from "../component/utils/ProductImage";
import {createSlug} from "../component/utils/utils"

const SearchProduto = () => {
  const [produtos, setProdutos] = useState([]);
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [id, setId] = useState(0);
  const [nomeFiltro, setNomeFiltro] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await getDistintosProdutosByNome();
        setProdutos(response.data);
        setFilteredProdutos(response.data);
      } catch (error) {
        toast.error("Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    };
    fetchProdutos();
  }, []);

  const handleFiltrar = (e) => {
    e.preventDefault();

    const nome = nomeFiltro.trim().toLowerCase();
    const idNum = Number(id);
    if (nome === "" && (!id || idNum === 0)) {
      setFilteredProdutos(produtos);
      setCurrentPage(1);
      return;
    }

    const filtrados = produtos.filter((p) => {
      const matchNome = nome === "" || p.nome.toLowerCase().includes(nome);
      const matchId = !idNum || p.id === idNum;
      return matchNome && matchId;
    });

    setFilteredProdutos(filtrados);
    setCurrentPage(1);
  };

  const handleExcluir = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
      await deleteProduto(id);
      toast.success("Produto excluído com sucesso!");
      setProdutos((prev) => prev.filter((p) => p.id !== id));
      setFilteredProdutos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      toast.error("Erro ao excluir produto");
    }
  };

  const handleAbrirModal = (produto) => {
    setProdutoEditando({ ...produto });
    console.log("Produto: ", produto)
    setShowModal(true);
  };

  const handleFecharModal = () => {
    setShowModal(false);
    setProdutoEditando(null);
  };

  const handleSalvarEdicao = async () => {
    try {
      console.log("produto editando: ", produtoEditando)
      const produtoDTO = {
        nome: produtoEditando.nome,
        marca: produtoEditando.marca,
        descricao: produtoEditando.descricao,
        preco: produtoEditando.preco,
        estoque: produtoEditando.estoque
      }
      const imagemDTO = produtoEditando.imagem;
      console.log("imagem: ", imagemDTO)
      console.log("dto: ", produtoDTO)
      await updateProduto(produtoEditando.id, produtoDTO);
      await uploadImage(imagemDTO, produtoEditando.id)
      toast.success("Produto atualizado com sucesso!");
      setProdutos((prev) =>
        prev.map((p) => (p.id === produtoEditando.id ? produtoEditando : p))
      );
      setFilteredProdutos((prev) =>
        prev.map((p) => (p.id === produtoEditando.id ? produtoEditando : p))
      );

      handleFecharModal();
    } catch (error) {
      toast.error("Erro ao atualizar produto");
    }
  };

  const totalPages = Math.ceil(filteredProdutos.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProdutos = filteredProdutos.slice(indexOfFirst, indexOfLast);

  return (
    <div className="produtos-page container mt-4">
      <h2 className="mb-3">Lista de Produtos</h2>

      <Form className="form-produtos" onSubmit={handleFiltrar}>
        <Form.Control
          type="text"
          placeholder="Buscar por nome..."
          value={nomeFiltro}
          onChange={(e) => setNomeFiltro(e.target.value)}
          className="me-2"
        />

        <Form.Control
          type="number"
          placeholder="Id do produto"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <Button type="submit">Buscar</Button>
      </Form>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
        </div>
      ) : filteredProdutos.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentProdutos.map((produto) => (
              <tr key={produto.id}>
                <td style={{ width: "80px" }}>
                  <Link to={`/produtos/produto/${produto.id}/${createSlug(produto.nome)}`}>
                    <ProductImage productId={produto.imagens[0].id} />
                  </Link>
                </td>
                <td>{produto.nome}</td>
                <td>{produto.estoque}</td>
                <td>
                  <div className="buttons">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAbrirModal(produto)}
                    >
                      Editar
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleExcluir(produto.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {totalPages > 1 && (
        <div className="pagination mt-3 d-flex justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
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

      <Modal show={showModal} onHide={handleFecharModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {produtoEditando && (
            <>
              <Form.Group className="mb-2">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={produtoEditando.nome}
                  onChange={(e) =>
                    setProdutoEditando({
                      ...produtoEditando,
                      nome: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={produtoEditando.descricao || ""}
                  onChange={(e) =>
                    setProdutoEditando({
                      ...produtoEditando,
                      descricao: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Estoque</Form.Label>
                <Form.Control
                  type="number"
                  value={produtoEditando.estoque}
                  onChange={(e) =>
                    setProdutoEditando({
                      ...produtoEditando,
                      estoque: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  type="number"
                  value={produtoEditando.preco}
                  onChange={(e) =>
                    setProdutoEditando({
                      ...produtoEditando,
                      preco: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>

               <Form.Group className="mb-2">
                <Form.Label>Imagem </Form.Label>
                <Form.Control
                  type="file"
                  accept="imagem/*"
                  onChange={(e) =>
                    setProdutoEditando({
                      ...produtoEditando,
                        imagem: e.target.files[0],
                    })
                  }
                />
              </Form.Group> 
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFecharModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSalvarEdicao}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SearchProduto;
