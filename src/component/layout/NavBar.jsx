import {React, useEffect} from 'react'
import { Container, Navbar, Nav, NavDropdown} from "react-bootstrap"
import { Link , useNavigate} from "react-router-dom"
import {useAuth} from "../../auth/AuthContext"
import { useCart } from '../../store/CarrinhoContext'
import RoleGuard from '../roles/RoleGuard'

const NavBar = () => {
    const navigate = useNavigate()
    const{user, logout, isAuthenticated} = useAuth()
    const {contagem} = useCart()

    const handleLogout = () => {
        logout();
        navigate("/")
    }

    return (
        <Navbar expand='lg' sticky='top' className='nav-bg'>
            <Container>
                <Navbar.Brand to={"/"} as={Link}>
                    <span className='shop-home' style={{color: "white"}}>AgroShop</span>
                </Navbar.Brand>

                <Navbar.Toggle/>
                
                <Navbar.Collapse>
                    <Nav className='me-auto'>
                        <Nav.Link to={"#"} as={Link}>
                            <span>Todos produtos</span>
                        </Nav.Link>
                    </Nav>

                    <RoleGuard allowedRoles={["Gerente", "ADM", "Funcionario"]}>
                        <Nav className='me-auto'>
                            <Nav.Link to={"/gerenciamento"} as={Link}>
                                <span>Gerenciar pedidos</span>
                            </Nav.Link>
                        </Nav>
                    </RoleGuard>

                    <Nav className='ms-auto '>
                        {isAuthenticated ? (
                        <NavDropdown title={`Olá, ${user.nome}`}>
                            <>
                                <NavDropdown.Item to={"/conta"} as={Link}>
                                    Minha conta
                                </NavDropdown.Item>

                                <NavDropdown.Divider/>

                                <NavDropdown.Item to={"/pedidos"} as={Link}>
                                    Meus pedidos
                                </NavDropdown.Item>

                                <NavDropdown.Divider/>

                                <NavDropdown.Item onClick={handleLogout}>
                                    Logout
                                </NavDropdown.Item>

                            </>
                        </NavDropdown>
                            ) : (
                                <Nav.Link to={"/login"} as={Link}>
                                    Entre ou Cadastre-se
                                </Nav.Link>
                            )}
                    </Nav>
                    <Nav className='ms-auto'>
                        <a href="/carrinho" className="carrinho-link">
                            <div className="carrinho-container">
                                <img src="carrinho.png" alt="Carrinho de compras" />
                                {contagem > 0 && (
                                    <div>
                                        <span className="carrinho-badge">
                                            {contagem}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </a>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar