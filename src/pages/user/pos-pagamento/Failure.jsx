import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Failure = () => {
    const location = useLocation();
    
    useEffect(() => {
        console.log("Pagamento falhou!");
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Pagamento falhou!</h1>
            <Link to="/">Voltar para a loja</Link>
        </div>
    );
};

export default Failure