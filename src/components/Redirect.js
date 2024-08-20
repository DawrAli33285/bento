import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = ({ children }) => {
    let navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            let user=JSON.parse(localStorage.getItem('user'))
            navigate(`/create-bento/${user.userName}`)
        } 
    }, [navigate]);

    return isAuthenticated ? null : children;
};

export default Redirect;
