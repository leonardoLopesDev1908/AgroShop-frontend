import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const { loginOAuth2 } = useAuth(); 

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            try {
                loginOAuth2(token);
                
                window.history.replaceState({}, '', '/');
                
                navigate('/');
            } catch (error) {
                console.error('Erro no login OAuth2:', error);
                navigate('/login?error=oauth_failed');
            }
        } else {
            navigate('/login?error=no_token');
        }
    }, [navigate, loginOAuth2]);

    return <div>Processando login...</div>;
};

export default OAuth2RedirectHandler;