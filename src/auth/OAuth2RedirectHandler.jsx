import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const {loadingUser } = useAuth();

    useEffect(() => {
        if (!loadingUser) {
            navigate("/");
        }
    }, [loadingUser]);

    return <div>Processando login via OAuth2...</div>;
};

export default OAuth2RedirectHandler;