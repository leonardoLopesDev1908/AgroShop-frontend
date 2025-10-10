import {React, useState} from "react"
import { addProduct, uploadImage } from "../../component/services/ProdutoService"

const FormProdutos = () => {
    const[nome, setNome] = useState('')
    const[marca, setMarca] = useState('')
    const[descricao, setDescricao] = useState('')
    const[preco, setPreco] = useState(0)
    const[categoria, setCategoria] = useState('')
    const[estoque, setEstoque] = useState(0)
    const[imagens, setImagem] = useState(null) 
    const[error, setError] = useState('')
    const[loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try{
            const response = await addProduct(nome, marca, descricao, preco, categoria, estoque)
            if(imagens){
                await uploadImage(imagens, response.data.id)
            }
            
            setNome('')
            setMarca('')
            setDescricao('')
            setPreco(0)
            setCategoria('')
            setEstoque(0)
            setImagem(null)
        }catch(error){
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="cadastro-container">
            <form className="cadastro-form" onSubmit={handleSubmit}>
                <h2>Cadastro de Produto</h2>

                {error && <div className="error-message">{error}</div>}

                <div className='datas'>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome do produto" disabled={loading}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="sobrenome">Marca</label>
                        <input type="text" id="marca" value={marca} onChange={e => setMarca(e.target.value)} placeholder="Marca do produto" disabled={loading}/>
                    </div>
                </div>

                <div className='datas'>
                    <div className="form-group">
                        <label htmlFor="descricao">Descrição</label>
                        <input type="text" id="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição do produto" disabled={loading}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="preco">Preço</label>
                        <input type="number" step="0.01" id="preco" value={preco} onChange={e => setPreco(e.target.value)} placeholder="Preço do produto" disabled={loading}/>
                    </div>
                </div>

                <div className='datas'>
                    <div className="form-group"> 
                        <label htmlFor="categoria">Categoria</label> 
                        <select type="text" id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)} placeholder="Categoria do produto" disabled={loading}> 
                            <option value="Racoes">Rações</option> 
                            <option value="Transporte">Transporte</option> 
                            <option value="Remedios">Remédios</option> 
                            <option value="Petiscos">Petiscos</option> 
                            <option value="Outros">Outros</option> 
                        </select>
                    </div>    
                    <div className="form-group">
                        <label htmlFor="estoque">Estoque</label>
                        <input type="number" id="estoque" value={estoque} onChange={e=>setEstoque(e.target.value)} placeholder="Quantidade em estoque"/>
                    </div>
                </div>
                    
                <div className="form-group">
                    <label htmlFor="imagem">Imagens do produto</label>
                    <input
                        type="file"
                        id="imagens"
                        onChange={e => setImagem(e.target.files[0])}
                        disabled={loading}
                        />
                </div>

                <button type="submit" className="cadastro-button" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
        </div>
    )
}

export default FormProdutos;






