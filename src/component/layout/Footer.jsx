import React from 'react'
import {FaInstagram, FaFacebookF, FaTwitter} from 'react-icons/fa'

const Footer = () => {
    return (
        <footer>
            <div className='mega-footer'>
                <div className='footer-container'>
                    <div className='footer-section'>
                        <h3>Sobre</h3>
                        <p>loprem ipsum dolor sit...</p>
                    </div>

                    <div className='footer-section'>
                        <h3>Categorias</h3>
                        <ul>
                            <li>Um</li>
                            <li>Dois</li>
                            <li>Tres</li>
                        </ul>
                    </div>

                    <div className='footer-section'>
                        <h3>Contato</h3>
                        <p>Email: contato@agroshop.com</p>
                        <p>Telefone: (051) 91234-5678</p>
                    </div>

                    <div className='footer-section'>
                        <h3>Siga-nos</h3>
                        <div className='social-icons'>
                            <a
                                href='https://facebook.com'
                                target='blank'
                                rel='noopener noreferrer'>
                                <FaFacebookF/>
                            </a>
                            <a
                                href='https://twitter.com'
                                target='blank'
                                rel='noopener noreferrer'>
                                <FaTwitter/>
                            </a>
                            <a
                                href='https://instagram.com'
                                target='blank'
                                rel='noopener noreferrer'>
                                <FaInstagram/>
                            </a>
                        </div>
                    </div>
                </div>

                <div className='footer-bottom'>
                    <p>&copy; 2025. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer