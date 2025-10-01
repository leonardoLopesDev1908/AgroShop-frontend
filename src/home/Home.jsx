import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' 
import Hero from '../component/hero/Hero'
import Paginator from '../component/common/Paginator'
import { Card, Col, Row, Container, Button, Form} from 'react-bootstrap'
import ProductImage from '../component/utils/ProductImage'
import { getDistintosProdutosByNome } from '../component/services/ProdutoService'
import { toast } from "react-toastify" 
import {useSelector} from "react-redux"

const Home = () => {
    const [produtos, setProdutos] = useState([])
    const [currentPage, setCurrentPage] = useState(1) 
    const itemsPerPage = 10
    const {searchQuery} = useSelector((state) => state.search)
    const [filteredProdutos, setFilteredProdutos] = useState([])


    const [filters, setFilter] = useState({
        termo: "",
        categoria: "",
        marca: "",
        precoMin: "",
        precoMax: ""
    })

    useEffect(() => {
        const getProdutos = async () => {
            try {
                const response = await getDistintosProdutosByNome()
                setProdutos(response.data)
            } catch (error) {
                const errorMsg = error.message || "Erro ao carregar produtos"
                toast.error(errorMsg) 
            }
        }
        getProdutos()
    }, [])

    useEffect(() => {
        if (!searchQuery) {
            setFilteredProdutos(produtos) 
        } else {
            const results = produtos.filter((produto) =>
                produto.nome.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredProdutos(results)
        }
    }, [searchQuery, produtos])

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const indexOfLastProduct = currentPage * itemsPerPage
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
    const currentProducts = filteredProdutos.slice( 
        indexOfFirstProduct,
        indexOfLastProduct
    )

    const totalItems = filteredProdutos.length

    return (
        <>
            <Hero/>
            <div className='main_produtos'>
                <div className=''>
                <h5>Filtros</h5>
                <Form>
                    <Form.Group className="mb-3">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select>
                        <option>Todos</option>
                        <option>Rações</option>
                        <option>Petiscos</option>
                        <option>Transporte</option>
                        <option>Roupas</option>
                    </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Marca</Form.Label>
                        
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Preço Mínimo</Form.Label>
                    <Form.Control type="number" placeholder="0" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Preço Máximo</Form.Label>
                    <Form.Control type="number" placeholder="1000" />
                    </Form.Group>

                    <Button variant="primary" className="w-100">
                        Aplicar filtros
                    </Button>
                </Form>
                </div>
                <div className='d-flex flex-wrap justify-content-center'>
                    {currentProducts.map((product) => (
                        <div>
                            <Card key={product.id} className="home-product-card m-3" style={{ width: '18rem' }}>
                                <Link to={`/produtos/produto/${product.nome}`} className="link">
                                    <div className='image-container'>
                                        {product.imagens && product.imagens.length > 0 ? (
                                            <ProductImage productId={product.imagens[0].id}/>
                                        ) : (
                                            <div className="text-center p-5">Sem imagem</div>
                                        )}
                                    </div>
                                </Link>
                                <Card.Body>
                                    <p className='product-description'>
                                        {product.nome} - {product.descricao}
                                    </p>
                                    <h4 className='price'>R$ {product.preco}</h4>
                                    <p className={`${product.estoque > 0 ? 'text-success' : 'text-danger'}`}>
                                        {product.estoque > 0 ? `Em estoque: ${product.estoque}` : 'Fora de estoque'}
                                    </p>
                                    <Link
                                        to={`/produtos/produto/${product.name}`}
                                        className='btn btn-primary w-100'
                                    >
                                        Compre agora
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                
                    {produtos.length > 0 && (
                        <div className='w-100 mt-4'>
                            <Paginator
                                itemsPerPage={itemsPerPage}
                                totalItems={totalItems}
                                currentPage={currentPage}
                                paginate={paginate}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home