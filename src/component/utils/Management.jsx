import React from "react"
import {Link} from "react-router-dom"

const Management = () => {
    return (
        <div className="management-page">
            <div>
                <h2>Painel de Gerenciamento</h2>
            </div>
            <div className="cards-container">
                <Link to="/cadastro-produto" className="card">
                    <h3>Cadastrar Produto</h3>
                    <p>Adicione novos produtos ao estoque</p>
                </Link>

                <Link to="/pesquisa-produto" className="card">
                    <h3>Pesquisar Produto</h3>
                    <p>Encontre e gerencie produtos existentes</p>
                </Link>

                <Link to="/pesquisa-pedidos" className="card">
                    <h3>Gerenciar Pedidos</h3>
                    <p>Veja, atualize ou cancele pedidos</p>
                </Link>
            </div>
        </div>
    );
};


export default Management;