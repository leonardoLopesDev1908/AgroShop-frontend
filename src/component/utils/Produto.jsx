import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {getProdutoById} from "../services/ProdutoService"
import {addProductToCart} from "../services/CarrinhoService"
import {Spinner} from "react-bootstrap"
import ProductImage from '../utils/ProductImage'
import { useCart } from '../../store/CarrinhoContext'
import { getProdutoByCategoria } from '../services/ProdutoService'
import {Link} from "react-router-dom"
import {Card, Modal, Form} from "react-bootstrap"
import {createSlug} from "../utils/utils"
import { getAvaliacoes, addAvaliacao, 
          excluirAvaliacao, jaAvaliou } from '../services/AvaliacaoService'
import {useAuth } from "../../auth/AuthContext"

const Produto = () => {
  const {isAuthenticated} = useAuth();
  const { id } = useParams()
  const {addToCarrinho} = useCart()
  const [produto, setProduto] = useState({});
  const [semelhantes, setSemelhantes] = useState([])
  const[imagemSelecionada, setImagemSelecionada] = useState(null)

  const [avaliacoes, setAvaliacoes] = useState([])
  const [jaAvaliado, setJaAvaliado] = useState(false)
  const [titulo, setTitulo] = useState("")
  const [comentario, setComentario] = useState("")
  const [nota, setNota] = useState(0)
  const [showModalAvaliacao, setShowModalAvaliacao] = useState(false)
  
  const[loading, setLoading] = useState(false)
  const[error, setError] = useState("")
  const[message, setMessage] = useState("")

  const handleAdicionarProduto = async () => {
    setError("")
    setLoading(true)
    try{
      const response = await addProductToCart(produto.id, 1)
      addToCarrinho(1)
      setMessage("Produto adicionado ao carrinho")
    }catch(error){
      setError(error.message)
      console.log(error.message)
    }finally {
      setLoading(false)
    }
  }

  useEffect(() => {
      const fetchProduto = async () => {
        setLoading(true)
          try{
              const data = await getProdutoById(id)
              setProduto(data.data)
          }catch(err){
              setError("Erro: " + err)
          }finally{
              setLoading(false)
          }
      }
      fetchProduto()
  }, [id])
  
  useEffect(() => {
    if (produto.imagens && produto.imagens.length > 0) {
      setImagemSelecionada(produto.imagens[0]);
    }
  }, [produto]);

  useEffect(() => {
      const fetchProduto = async () => {
        setLoading(true)
          try{
              const data = await getProdutoById(id)
              const produto = data.data
    
              setProduto(produto)
              const outros = await getProdutoByCategoria(produto.categoria.nome)
              
              const filtrados = outros.filter(p => p.id !== produto.id);
              setSemelhantes(filtrados) 
          }catch(err){
              setError("Erro: " + err)
          }finally{
              setLoading(false)
          }
      }
      fetchProduto()
  }, [id])

  useEffect(() => {
    const fetchAvaliacoes = async() => {
      setLoading(true)
      try{
        const data = await getAvaliacoes(id)
        console.log(data)
        setAvaliacoes(data.data)
      } catch(error){
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAvaliacoes();
  }, [id])

  useEffect(() => {
    if (!id) return;
    const fetchJaAvaliado = async () => {
      try{
        const data = await jaAvaliou(id);
        console.log(data.data)
        setJaAvaliado(data.data);
      }catch(error){
        setError(error.message);
      }
    }
    fetchJaAvaliado();
  }, [id]);

  const handleFecharModal = async() => {
    setShowModalAvaliacao(false)
  }

  const handleSalvarAvaliacao = async () => {
    try {
      const avaliacaoDTO = {
        titulo,
        comentario,
        nota
      };
      await addAvaliacao(avaliacaoDTO, id);
      setShowModalAvaliacao(false);
      const { data } = await getAvaliacoes(id);
      setAvaliacoes(data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <Spinner animation="border" className="m-5" />
  if (error) return <p className="text-danger text-center mt-5">{error}</p>
  if (!produto) return <p className="text-center mt-5">Produto não encontrado</p>

  return (
    <div className="produto-pagina">
      <div className="produto-infos">
        <div className="produto-imagens">
          <div>
            {imagemSelecionada ? (
              <ProductImage productId={imagemSelecionada.id} />
            ) : (
              <div className="sem-imagem">Sem imagem disponível</div>
            )}

            {produto.imagens && produto.imagens.length > 1 && (
              <div className="produto-miniaturas">
                {produto.imagens.map((img, index) => (
                  <div
                    key={index}
                    className={`miniatura ${imagemSelecionada?.id === img.id ? "ativa" : ""}`}
                    onClick={() => setImagemSelecionada(img)}
                    style={{ cursor: "pointer", display: "inline-block", marginRight: "5px" }}
                  >
                    <ProductImage productId={img.id} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="produto-detalhes">
          <span className="produto-marca">{produto.marca || "Marca não informada"}</span>
          <h2 className="produto-nome">{produto.nome}</h2>
          <p className="produto-codigo">Código: {produto.id || "N/A"}</p>
          <p className="success-message">{message}</p>
          <p className="produto-descricao">{produto.descricao}</p>
          <div className="produto-precos">
            {produto.precoPromocional ? (
              <>
                <span className="produto-preco-promocional">
                  R$ {produto.precoPromocional.toFixed(2)}
                </span>
                <span className="produto-preco-normal">
                  R$ {produto.preco.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="produto-preco-promocional">
                R$ {produto.preco?.toFixed(2) || "Indisponível"}
              </span>
            )}
          </div>
          <p
            className={`produto-estoque ${
              produto.estoque > 0 ? "disponivel" : "indisponivel"
            }`}
          >
          {produto.estoque < 20
          ? (produto.estoque > 0
              ? `Em estoque: ${produto.estoque}`
              : "Fora de estoque")
          : ""}
          </p>
          <div className="produto-acoes">
            {produto.estoque > 0 && (
              <button
              className="btn-principal"
              disabled={produto.estoque === 0}
              onClick={handleAdicionarProduto}
              >
                Adicionar ao carrinho
              </button>
            )}
          </div>
          <div className="produto-frete">
            <label htmlFor="cep"><strong>Frete e prazo:</strong> </label>
            <div className="frete-form">
              <input
                type="text"
                id="cep"
                placeholder="Digite o CEP"
              />
              <button type="button" className="">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
      {isAuthenticated && !jaAvaliado  &&(
          <div className="avaliacoes-container">
            <button className="btn btn-outline-primary" onClick={() => setShowModalAvaliacao(true)}>
              Avaliar este produto
            </button>
          </div>
      )}
      <div className="avaliacoes-container mt-4">
          <h3>Avaliações ({avaliacoes.length})</h3>

          {avaliacoes.length === 0 ? (
            <p className="text-muted">Nenhuma avaliação ainda.</p>
          ) : (
            avaliacoes.map((a, index) => (
                <div className="avaliacao-card">
                  <p style={{fontWeight: "700"}}>{a.usuario?.nome || "Usuário anônimo"}</p>
                  <h5>{a.titulo}</h5>
                  <p className="mb-1">{a.comentario}</p>
                  <p className="text-warning">{"★".repeat(Math.round(a.nota))}</p>
                </div>
            ))
          )}
      </div>
      <div className="avaliacao-section">
        <Modal show={showModalAvaliacao} onHide={() => setShowModalAvaliacao(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Avaliar produto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-2'>
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-2'>
              <Form.Label>Comentário</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-2'>
              <Form.Label>Nota</Form.Label>
              <Form.Range
                min="0"
                max="5"
                step="0.5"
                value={nota}
                onChange={(e) => setNota(parseFloat(e.target.value))}
              />
              <p>Nota: {nota} ★</p>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={() => setShowModalAvaliacao(false)}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={handleSalvarAvaliacao}>
              Salvar Avaliação
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <h3>Semelhantes</h3>
             <div className="lista-produtos-sec">
          {semelhantes.map((produto) => (
            <div className='produto-sec' key={produto.id}>
              <Card className="home-produto-card m-3" style={{ width: '18rem' }}>
                <Link to={`/produtos/produto/${produto.id}/${createSlug(produto.nome)}`}>
                  <div className='image-container'>
                    {produto.imagens && produto.imagens.length > 0 ? (
                      <ProductImage productId={produto.imagens[0].id}/>
                    ) : (
                      <div className="text-center p-5">Sem imagem</div>
                    )}
                  </div>
                </Link>
                <Card.Body>
                  <p className='produto-description'>
                    <strong>{produto.nome}</strong>
                  </p>
                  <h4 className='price'>R$ {produto.preco.toFixed(2).replace('.', ',')}</h4>
                  <Link to={`/produtos/produto/${produto.id}/${createSlug(produto.nome)}`}>
                    <button className='btn btn-primary w-100'>Ver produto</button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
      </div>
    </div>

  )
}

export default Produto;