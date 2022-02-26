import React, { useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useStore } from "../../utils/useStore";
import { observer } from "mobx-react-lite";
import { RouteAccess } from "../../config/RouteAccess";

// export const PrivateRoute = observer(({ component: Component, ...rest }) => {
export const PrivateRoute = observer(({ component: RouteComponent }) => {
    const store = useStore();
    const navigate = useNavigate();
    const location = useLocation();
    let routeByRole = RouteAccess();
    let currentRole = localStorage.getItem('role');
    let token = localStorage.getItem('access_token');
    store.setToken(token);

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        if ((!token || token === "null") && location.pathname !== "/login") {
            navigate("/login", { replace: true });
        }
    })

    const checkToken = (
        !store.token ||
        store.token !== 'null' ||
        !token ||
        token === "null"
    )

    const checkRouteByRole = routeByRole[currentRole]

    if (!checkRouteByRole) {
        navigate('/login')
        store.authentication.logout();
        return <Navigate to="/login" replace={true} />
    }

    const checkCanAccessRoute = checkRouteByRole.find(r => {
        return r.toLowerCase() === (location.pathname)
    })

    if (!checkCanAccessRoute) {
        navigate('/404')
    }

    return checkToken && checkRouteByRole ? <RouteComponent /> : <Navigate to="/login" replace={true} />;
});
