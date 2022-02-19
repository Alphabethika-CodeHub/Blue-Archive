import React, { useEffect } from 'react';
import { Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useStore } from "../../utils/useStore";
import { observer } from "mobx-react-lite";
import { RouteAccess } from "../../config/RouteAccess";

export const PrivateRoute = observer(({ component: Component, ...rest }) => {
    const store = useStore();
    const history = useHistory();
    const location = useLocation();
    let routeByRole = RouteAccess();
    let currentRole = localStorage.getItem('role');
    let token = localStorage.getItem('access_token');
    store.setToken(token);

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        if ((!token || token === "null") && location.pathname !== "/login") {
            history.push('/login');
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
        history.push('/login')
        store.authentication.logout();
        return <Route component={() => <Redirect to={"/login"} />} />
    }

    const checkCanAccessRoute = checkRouteByRole.find(r => {
        return r.toLowerCase() === (location.pathname)
    })

    if (!checkCanAccessRoute) {
        history.push('/404')
    }

    return (
        <Route
            {...rest}
            render={(props) => checkToken
                ? (<Component {...props} />)
                : (<Component {...props} />)
            } />
    )
});
