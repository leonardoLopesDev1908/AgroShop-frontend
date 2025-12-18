import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Pending = () => {
    const location = useLocation();
    
    useEffect(() => {
        console.log("Pagamento pendente...");
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Aguardando confirmação de pagamento...</p>
            <Link to="/">Voltar para a loja</Link>
        </div>
    );
};

export default Pending