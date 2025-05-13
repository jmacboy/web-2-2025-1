import { useEffect, useState } from "react";
import { LOCAL_STORAGE_TOKEN } from "../src/utils/CONSTANTS";
import { useNavigate } from "react-router";

export const useAuth = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(LOCAL_STORAGE_TOKEN));

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }

    }, [isAuthenticated]);

    return { isAuthenticated };
}