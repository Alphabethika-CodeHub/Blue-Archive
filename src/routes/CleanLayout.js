import { Route, Switch } from 'react-router-dom';
import { Login } from '../pages/Login';
// import {PublicRoute} from '../components/Route/PublicRoute';
import { PrivateRoute } from '../components/Route/PrivateRoute';
import { App } from '../pages/App/App';

// 404
import { NotFoundPage } from "../pages/NotFound";

export const MainRoutes = () => {
    return (
        <Switch>
            <Route path="/login" exact>
                <Login />
            </Route>

            <Route path="/" exact>
                <Login />
            </Route>

            <Route path='/404' exact>
                <NotFoundPage />
            </Route>

            <PrivateRoute component={App} path='/' />
        </Switch>
    );
};
