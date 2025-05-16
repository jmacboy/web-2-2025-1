import { useEffect, useState } from "react";
import { LOCAL_STORAGE_EMAIL, LOCAL_STORAGE_TOKEN } from "../src/utils/CONSTANTS";
import { useNavigate } from "react-router";

export const useAuth = (shouldRedirect) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(LOCAL_STORAGE_TOKEN));

    useEffect(() => {
        if (shouldRedirect && !isAuthenticated) {
            navigate('/login');
        }

    }, [isAuthenticated]);
    const logout = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        setIsAuthenticated(false);
        navigate('/login');
    }
    const loginUser = (token, email) => {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
        localStorage.setItem(LOCAL_STORAGE_EMAIL, email);
    }
    const getAuthUser = () => {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
        const email = localStorage.getItem(LOCAL_STORAGE_EMAIL);
        return { token, email };
    }

    return { isAuthenticated, logout, loginUser, getAuthUser };
}