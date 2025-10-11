import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' 
import Hero from '../component/hero/Hero'
import Paginator from '../component/common/Paginator'
import { Card } from 'react-bootstrap'
import ProductImage from '../component/utils/ProductImage'
import { getDistintosProdutosByNome, getProdutosFiltrados, addProductToCart } from '../component/services/ProdutoService'
import { toast } from "react-toastify" 
import {useSelector} from "react-redux"
import FiltersComponent from "../component/search/FiltersComponent"
import {useNavigate} from "react-router-dom"


const Home = () => {
    const navigate = useNavigate()
    const [produtos, setProdutos] = useState([])
    const [currentPage, setCurrentPage] = useState(1) 
    const [filteredProdutos, setFilteredProdutos] = useState([])
    const itemsPerPage = 20

    const filters = useSelector(state => state.filters)

    function createSlug(name) {
        return name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9 ]/g, "")
            .trim()
            .replace(/\s+/g, "-");
    }

    function buildQuery(filters, currentPage) {
        const params = new URLSearchParams();
        if (filters.categoria) params.append("categoria", filters.categoria);
        if (filters.precoMin) params.append("precoMin", filters.precoMin);
        if (filters.precoMax) params.append("precoMax", filters.precoMax);
        if (filters.search) params.append("search", filters.search);
        params.append("pagina", currentPage);
        
        const queryString = params.toString();
        return queryString;
    }

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                let data;
                
                if (filters.categoria || filters.precoMin || filters.precoMax || filters.search) {
                    const query = buildQuery(filters, currentPage - 1);
                    data = await getProdutosFiltrados(query)
                } else {
                    data = await getDistintosProdutosByNome();
                }

                setProdutos(data.data);
                setFilteredProdutos(data.data);
            } catch(error) {
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
                <div className='card-grid'>
                    {currentProducts.map((product) => (
                        <div>
                            <Card key={product.id} className="home-product-card m-3" style={{ width: '18rem' }}>
                                <Link to={`/produtos/produto/${product.id}/${createSlug(product.nome)}`}>
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
                                    <h4 className='price'>R$ {product.preco.toFixed(2)}</h4>
                                    {product.estoque > 0 ? `Em estoque: ${product.estoque}` : 'Fora de estoque'} 
                                    <p className={`${product.estoque > 0 ? 'text-success' : 'text-danger'}`}>
                                    </p>
                                    <Link to={`/produtos/produto/${product.id}/${createSlug(product.nome)}`}>
                                        <button className='btn btn-primary w-100'>Ver produto</button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                
                </div>
            </div>
                    <div>
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
        </>
    )
}

export default Home