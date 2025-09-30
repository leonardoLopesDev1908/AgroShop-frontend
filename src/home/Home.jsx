import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' // 👈 Faltou importar Link
import Hero from '../component/hero/Hero'
import Paginator from '../component/common/Paginator'
import { Card } from 'react-bootstrap'
import ProductImage from '../component/utils/ProductImage'
import { getDistintosProdutosByNome } from '../component/services/ProdutoService'
import { toast } from "react-toastify" 

const Home = () => {
    const [produtos, setProdutos] = useState([])
    const [currentPage, setCurrentPage] = useState(1) 
    const itemsPerPage = 10
    const {searchQuery} = useSelector((state) => state.search)


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
        const results = produtos.filter((produto) => {
            const matchesQuery = produto.nome.toLowerCase().includes(searchQuery.toLowerCase())
        })
    })


    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const indexOfLastProduct = currentPage * itemsPerPage
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
    const currentProducts = produtos.slice( 
        indexOfFirstProduct,
        indexOfLastProduct
    )

    const totalItems = produtos.length

    return (
        <>
            <Hero/>
            <div className='d-flex flex-wrap justify-content-center p-5'>
                {currentProducts.map((product) => (
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
        </>
    )
}

export default Home