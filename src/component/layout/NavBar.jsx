import React from 'react'
import { Container, Navbar, Nav, NavDropdown} from "react-bootstrap"
import { Link } from "react-router-dom"


const NavBar = () => {
    return (
        <Navbar expand='lg' sticky='top' className='nav-bg'>
            <Container>
                <Navbar.Brand to={"/"} as={Link}>
                    <span className='shop-home'>AgroShop</span>
                </Navbar.Brand>

                <Navbar.Toggle/>
                
                <Navbar.Collapse>
                    <Nav className='me-auto'>
                        <Nav.Link to={"#"} as={Link}>
                            Todos produtos
                        </Nav.Link>
                    </Nav>
                    <Nav className='me-auto'>
                        <Nav.Link to={"#"} as={Link}>
                            Gerenciar pedidos
                        </Nav.Link>
                    </Nav>
                    <Nav className='ms-auto'>
                        <NavDropdown title='Conta'>
                            <>
                                <NavDropdown.Item to={"#"} as={Link}>
                                    Minha conta
                                </NavDropdown.Item>

                                <NavDropdown.Divider/>

                                <NavDropdown.Item to={"#"} as={Link}>
                                    Meus pedidos
                                </NavDropdown.Item>

                                <NavDropdown.Divider/>

                                <NavDropdown.Item to={"#"} as={Link}>
                                    Logout
                                </NavDropdown.Item>
                            </>
                            <NavDropdown.Item to={"#"} as={Link}>
                                Login
                            </NavDropdown.Item>

                        </NavDropdown>
                    </Nav>


                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar