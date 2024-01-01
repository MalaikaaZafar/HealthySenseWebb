import { Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { verifyToken } from '../services/user/verifyToken';
import { useEffect, useState } from 'react';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            if (!Cookies.get('token')) {
                setIsAuthenticated(false);
                return;
            }
            const res = await verifyToken();
            if (window.location.href.includes('admin')) {
                if (res !== 'Admin') {
                    setIsAuthenticated(false);
                    return;
                }
            }
            else if (window.location.href.includes('patient')) {
                if (res != 'Patient') {
                    setIsAuthenticated(false);
                    return;
                }
            }
            else if (window.location.href.includes('doctor')) {
                if (res !== 'Doctor') {
                    setIsAuthenticated(false);
                    return;
                }
            }
            console.log('checkAuth2');
            setIsAuthenticated(true);
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return null; // or a loading spinner
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;