import React, { useState } from "react";

const SearchPedido = () => {
    const [email, setEmail] = useState("");
    const [produtoId, setProdutoId] = useState("");
    const [dataInicial, setDataInicial] = useState("");
    const [dataFinal, setDataFinal] = useState("");
    const [resultados, setResultados] = useState([]);

    const handlePesquisa = async (e) => {
        e.preventDefault();

        // Aqui você chamaria seu serviço, ex:
        // const data = await pesquisarProdutos({ email, produtoId, dataInicial, dataFinal });
        // setResultados(data);

        console.log({ email, produtoId, dataInicial, dataFinal });
    };

    return (
        <div className="pesquisa-page">
            <h2>Pesquisa de Produtos</h2>
            <form className="pesquisa-form" onSubmit={handlePesquisa}>
                <div className="form-group">
                    <label>Email do usuário</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Digite o email"
                    />
                </div>

                <div className="form-group">
                    <label>ID do produto</label>
                    <input 
                        type="text" 
                        value={produtoId} 
                        onChange={(e) => setProdutoId(e.target.value)} 
                        placeholder="Digite o ID do produto"
                    />
                </div>

                <div className="form-group">
                    <label>Data Inicial</label>
                    <input 
                        type="date" 
                        value={dataInicial} 
                        onChange={(e) => setDataInicial(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Data Final</label>
                    <input 
                        type="date" 
                        value={dataFinal} 
                        onChange={(e) => setDataFinal(e.target.value)}
                    />
                </div>

                <button type="submit">Pesquisar</button>
            </form>

            <div className="resultados">
                {resultados.length > 0 ? (
                    <ul>
                        {resultados.map((item, index) => (
                            <li key={index}>
                                Produto: {item.produto.nome} | Usuário: {item.usuario.email} | Data: {item.data}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum resultado encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default SearchPedido;
