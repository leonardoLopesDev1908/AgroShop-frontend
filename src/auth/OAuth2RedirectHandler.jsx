import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        } else {
            navigate("/");
        }
    }, [isAuthenticated]);

    return <div>Processando login via OAuth2...</div>;
};

export default OAuth2RedirectHandler;