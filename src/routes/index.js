import { Switch } from 'react-router-dom';
import { PrivateRoute } from "../components/Route/PrivateRoute";
import { Dashboard } from "../pages/Dashboard";

// Category
import { CategoryList } from "../pages/Category/CategoryList";
import { CategoryForm } from "../pages/Category/Form/CategoryForm";

// Document
import { DocumentForm } from "../pages/Document/Form/DocumentForm";

// Company
import { CompanyList } from "../pages/Company/CompanyList";
import { CompanyForm } from "../pages/Company/Form/CompanyForm";

// Folder
import { FolderList } from "../pages/Folder/FolderList";
import { FolderForm } from "../pages/Folder/Form/FolderForm";
import { FolderCompanyA } from "../pages/Folder/FolderCompanyA";
import { FolderCompanyB } from "../pages/Folder/FolderCompanyB";

// Account
import { Account } from "../pages/Account";

export const AppRoute = () => {

    return (
        <Switch>
            <PrivateRoute path='/dashboard' exact>
                <Dashboard />
            </PrivateRoute>

            {/* Category */}
            <PrivateRoute path='/category-list' exact>
                <CategoryList />
            </PrivateRoute>
            <PrivateRoute path='/create-category' exact>
                <CategoryForm mode="create" />
            </PrivateRoute>
            <PrivateRoute path='/edit-category' exact>
                <CategoryForm mode="edit" />
            </PrivateRoute>

            {/* Document */}
            <PrivateRoute path='/create-document' exact>
                <DocumentForm mode="create" />
            </PrivateRoute>
            <PrivateRoute path='/edit-document' exact>
                <DocumentForm mode="edit" />
            </PrivateRoute>

            {/* Company */}
            <PrivateRoute path='/create-company' exact>
                <CompanyForm mode="create" />
            </PrivateRoute>
            <PrivateRoute path='/edit-company' exact>
                <CompanyForm mode="edit" />
            </PrivateRoute>
            <PrivateRoute path='/company-list' exact>
                <CompanyList />
            </PrivateRoute>
            <PrivateRoute path='/company-list/folder-a' exact>
                <FolderCompanyA />
            </PrivateRoute>
            <PrivateRoute path='/company-list/folder-b' exact>
                <FolderCompanyB />
            </PrivateRoute>

            {/* Folder */}
            <PrivateRoute path='/create-folder' exact>
                <FolderForm mode="create" />
            </PrivateRoute>
            <PrivateRoute path='/edit-folder' exact>
                <FolderForm mode="edit" />
            </PrivateRoute>
            <PrivateRoute path='/folder-list' exact>
                <FolderList />
            </PrivateRoute>

            {/* Account */}
            <PrivateRoute path='/account' exact>
                <Account />
            </PrivateRoute>
        </Switch>
    );
};
