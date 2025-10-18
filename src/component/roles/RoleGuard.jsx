import { DEFAULT_BREAKPOINTS } from "react-bootstrap/esm/ThemeProvider";
import {useAuth} from "../../auth/AuthContext"

const RoleGuard = ({allowedRoles, children}) => {
    const {user} = useAuth();

    if(!user) return null;

    const hasRoles = user.roles?.some(role => allowedRoles.includes(role));

    return hasRoles ? children : null;
};

export default RoleGuard;