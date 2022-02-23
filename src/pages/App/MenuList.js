import React from 'react';
import { TabletOutlined, DashboardOutlined, FormOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
// const isSuperAdmin = localStorage.getItem('role') === 'SUPERADMIN';

const MenuList = {
    title: "Blue Archive",
    route: {
        path: '/',
        icon: <TabletOutlined />,
        routes: [

            // START MENU MOR
            {
                name: 'Dashboard',
                icon: <DashboardOutlined />,
                path: '/dashboard',
                roles: ['admin'],
            },
            {
                name: 'Config Document',
                icon: <FormOutlined />,
                path: '/document',
                routes: [
                    {
                        name: 'Add Document',
                        path: '/create-document',
                    },
                    {
                        name: 'Company',
                        path: '/company-list',
                    },
                    {
                        name: 'Folder',
                        path: '/folder-list',
                    },
                    {
                        name: 'Category',
                        path: '/category-list',
                    }
                ],
                roles: ['admin'],
            },
            {
                name: 'Company A',
                icon: <UnorderedListOutlined />,
                path: '/company-a',
                routes: [
                    {
                        name: 'Folder A',
                        path: '/company-list/folder-a',
                    },
                    {
                        name: 'Folder B',
                        path: '/company-list/folder-b',
                    }
                ],
                roles: ['admin']
            },
            {
                name: 'Company B',
                icon: <UnorderedListOutlined />,
                path: '/company-b',
                routes: [
                    {
                        name: 'Folder A',
                        path: '/company-list/folder-a',
                    },
                    {
                        name: 'Folder B',
                        path: '/company-list/folder-b',
                    }
                ],
                roles: ['admin']
            },
            {
                name: 'Account',
                icon: <UserOutlined />,
                path: '/account',
                roles: ['admin']
            },
        ],
    },
};

export default MenuList;
