import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
// import {PublicRoute} from '../components/Route/PublicRoute';
import { PrivateRoute } from '../components/Route/PrivateRoute';
import { Dashboard } from "../pages/Dashboard";
// import { App } from '../pages/App/App';
import { DesktopLayout } from "../pages/App/DesktopLayout";

// Category
// import { CategoryList } from "../pages/Category/CategoryList";
// import { CategoryForm } from "../pages/Category/Form/CategoryForm";

// Document
// import { DocumentForm } from "../pages/Document/Form/DocumentForm";

// Company
// import { CompanyList } from "../pages/Company/CompanyList";
// import { CompanyForm } from "../pages/Company/Form/CompanyForm";

// Folder
// import { FolderList } from "../pages/Folder/FolderList";
// import { FolderForm } from "../pages/Folder/Form/FolderForm";
// import { FolderCompanyA } from "../pages/Folder/FolderCompanyA";
// import { FolderCompanyB } from "../pages/Folder/FolderCompanyB";

// Account
import { Account } from "../pages/Account";

// 404
import { NotFoundPage } from "../pages/NotFound";

export const MainRoutes = () => {
    return (
        <Routes>

            <Route path="/" exact element={<Login />} />

            <Route path="/login" exact element={<Login />} />

            <Route path="/404" exact element={<NotFoundPage />} />

            <Route
                path="/"
                element={<PrivateRoute component={DesktopLayout} />}
            >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/account" element={<Account />} />
            </Route>
        </Routes>
    );
};
