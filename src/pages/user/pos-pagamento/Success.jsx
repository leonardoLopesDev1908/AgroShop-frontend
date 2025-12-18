import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Success = () => {
    const location = useLocation();
    
    useEffect(() => {
        console.log("Pagamento aprovado!");
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>✅ Pagamento Aprovado!</h1>
            <p>Seu pedido foi processado com sucesso.</p>
            <p>Você receberá um e-mail com os detalhes.</p>
            <Link to="/">Voltar para a loja</Link>
        </div>
    );
};

export default Success