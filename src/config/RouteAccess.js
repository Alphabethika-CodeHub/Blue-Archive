import { useLocation } from "react-router-dom";

export const RouteAccess = () => {
    const location = useLocation();
    const pathnameId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

    return {
        ADMIN: [
            '/dashboard',

            '/create-document',
            '/edit-document',
            '/company-list/folder-a',
            '/company-list/folder-b',

            '/create-company',
            '/edit-company',
            '/company-list',

            '/create-folder',
            '/edit-folder',
            '/folder-list',

            '/category-list',
            '/create-category',
            '/edit-category',

            '/account',
            `/detail/${pathnameId}`
        ],
        USER: [
            '/dashboard',
            '/list'
        ]
    };
}
