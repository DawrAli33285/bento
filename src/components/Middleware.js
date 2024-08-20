import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Middleware = ({ children }) => {
    let navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);

    return isAuthenticated ? children : null;
};

export default Middleware;
