import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' 
import Hero from '../component/hero/Hero'
import Paginator from '../component/common/Paginator'
import { Card } from 'react-bootstrap'
import ProductImage from '../component/utils/ProductImage'
import { getDistintosProdutosByNome, getProdutosFiltrados } from '../component/services/ProdutoService'
import { toast } from "react-toastify" 
import {useSelector} from "react-redux"
import FiltersComponent from "../component/search/FiltersComponent"



const Home = () => {
    const [produtos, setProdutos] = useState([])
    const [currentPage, setCurrentPage] = useState(1) 
    const [filteredProdutos, setFilteredProdutos] = useState([])
    const itemsPerPage = 20

    const filters = useSelector(state => state.filters)

    function buildQuery(filters, currentPage) {
        const params = new URLSearchParams();
        if (filters.categoria) params.append("categoria", filters.categoria);
        if (filters.precoMin) params.append("precoMin", filters.precoMin);
        if (filters.precoMax) params.append("precoMax", filters.precoMax);
        if (filters.search) params.append("search", filters.search);
        params.append("pagina", currentPage);
        
        const queryString = params.toString();
        console.log("Query string construída:", queryString);
        return queryString;
    }

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                let data;
                
                console.log("Filtros ativos:", filters);
                console.log("Página atual:", currentPage);
                
                if (filters.categoria || filters.precoMin || filters.precoMax || filters.search) {
                    const query = buildQuery(filters, currentPage - 1);
                    console.log("Query gerada:", query);
                    
                    data = await getProdutosFiltrados(query)
                    console.log("Dados recebidos com filtros:", data);
                } else {
                    console.log("Carregando produtos sem filtros");
                    data = await getDistintosProdutosByNome();
                    console.log("Dados recebidos sem filtros:", data);
                }

                setProdutos(data.data);
                setFilteredProdutos(data.data);
            } catch(error) {
                console.error("Erro detalhado:", error);
                const errorMsg = error.response?.data?.message || error.message || "Erro ao carregar os produtos";
                toast.error(errorMsg);
            }
        };
        
        fetchProdutos();
    }, [filters, currentPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const indexOfLastProduct = currentPage * itemsPerPage
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
    const currentProducts = Array.isArray(filteredProdutos)
        ? filteredProdutos.slice(indexOfFirstProduct, indexOfLastProduct)
        : []
    const totalItems = Array.isArray(filteredProdutos) ? filteredProdutos.length : 0

    return (
        <>  
            <Hero/>
            <div className='main_produtos'>
                <div className='filters-container'>
                    <h5>Filtros</h5>
                    <FiltersComponent/>
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
                                    {/* /*Mostrar estoque apenas se tiver com menos de 10 */    }
                                    <h4 className='price'>R$ {product.preco}</h4>
                                        {product.estoque > 0 ? `Em estoque: ${product.estoque}` : 'Fora de estoque'} 
                                    <p className={`${product.estoque > 0 ? 'text-success' : 'text-danger'}`}>
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
                
                    {currentProducts.length > 0 && (
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