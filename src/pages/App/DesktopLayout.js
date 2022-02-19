/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {
    Menu,
    Dropdown,
    List,
    Avatar,
    message,
    Row,
    Col,
    Space,
    Layout,
    Drawer,
    Button
} from 'antd';
import {
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    UserOutlined,
    TeamOutlined,
    DesktopOutlined,
    FileOutlined
} from '@ant-design/icons';
import ProLayout, {PageContainer} from '@ant-design/pro-layout';
import {AppRoute} from '../../routes/';
import {useHistory, useLocation} from 'react-router-dom';
import iconUser from '../../Assets/icon/image.svg';
import './DesktopLayout.css';
import MenuList from './MenuList';
// import { useStore } from "../../utils/useStore";
import {observer} from "mobx-react-lite";
import moment from "moment";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

export const DesktopLayout = observer(() => {
    const history = useHistory();
    // const store = useStore();
    const location = useLocation();
    const [pathname, setPathname] = useState(location.pathname);
    const [collapsed, setCollapsed] = useState(false);
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const content = (
        <PageContainer>
            <AppRoute/>
        </PageContainer>
    );

    const menu = (
        <Menu style={{width: 'auto', backgroundColor: '#ffffff'}}>
            <Menu.Item key="0">
                <a>ADMIN</a>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="1">
                <a href='#'>Profile</a>
            </Menu.Item>
            <Menu.Item key="2">
                <p onClick={() => {
                    // store.authentication.logout()
                    message.success("Successfully logout!")
                    history.push('/login')
                }}> Sign out</p>
            </Menu.Item>
        </Menu>
    );

    const data = [
        {
            title: 'Nopal Menambahkan Dokumen Baru dengan nama Dokumen Negara ke Kategori A.',
            desc: "3 hours ago"
        },
        {
            title: 'Nopal Memindahkan Dokumen Rahasia dari Kategori A ke Kategori B.',
            desc: "1 day ago"
        },
        {
            title: 'Nopal Menghapus Dokumen Biasa pada Kategori C.',
            desc: "10 decades ago"
        },
        {
            title: 'Nopal Melakukan Print Dokumen 1.',
            desc: "he is a time traveller now..."
        },
    ];

    return (
        <ProLayout
            layout={'side'}
            multiple={true}
            route={{
                path: MenuList.route.path,
                icon: MenuList.route.icon,
                routes: MenuList.route.routes.filter(item => {
                    return item.roles.includes('admin')
                })
            }}
            location={{
                pathname
            }}
            pathname={pathname}
            headerHeight={50}
            headerTheme={'light'}
            navTheme={'light'}
            fixSiderbar={true}
            collapsed={collapsed}
            collapsedButtonRender={false}
            onCollapse={setCollapsed}
            title={'Blue Archive'}
            // menuFooterRender={(props) => "Hello World"}
            // logo={collapsed ? sidebarIcon : "Blue Archive"}
            // headerTitleRender={() => "Hello World"}
            // menuHeaderRender={() => <p style={{fontSize: "24px", textAlign: "center"}}>Blue Archive</p>}
            menuExtraRender={() => <p style={{fontSize: "40px", marginBottom: 0, marginTop: -30, textAlign: "center"}}>
                {moment().format('LT')}
            </p>}
            rightContentRender={() => {
                return <div>
                    <Button type="link" onClick={showDrawer}>
                        <MenuFoldOutlined/>
                    </Button>
                    <Drawer title="User Record Log Activity" placement="right" onClose={onClose} visible={visible}>
                        <List
                            style={{backgroundColor: "white", padding: 0}}
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description={`${item.desc}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Drawer>
                </div>
            }}
            menuItemRender={(item, dom) => (
                <div
                    key={item.path}
                    onClick={() => {
                        setPathname(item.path);
                        history.push(item.path);
                    }}
                >
                    {dom}
                </div>
            )}
            pageTitleRender={props => {
                const currentRoute = MenuList.title
                const defaultRouteName = props.pathname.replace(/\//g, ' ').trim();
                return currentRoute ?? defaultRouteName;
            }}
            headerContentRender={() => {
                return (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 2em 0 1em'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <div
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    marginRight: '3em'
                                }}
                            >
                                {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            </div>
                        </div>
                        <div style={{display: 'flex', gap: '0.5em'}}>
                            <Space/>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a
                                    className="ant-dropdown-link"
                                    style={{display: 'flex', alignItems: 'center', color: 'black'}}
                                    onClick={e => e.preventDefault()}
                                >
                                    <Avatar src={iconUser}/>
                                    <span
                                        style={{marginLeft: '0.5em'}}
                                    >ADMIN
                                    </span>
                                    <DownOutlined
                                        style={{marginLeft: '0.5em'}}
                                    />
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                );
            }}
        >
            {content}
        </ProLayout>
    );
});
