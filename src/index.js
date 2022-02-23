import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import enUs from 'antd/lib/locale/en_US';
import { App } from "./app";

ReactDOM.render(
    <React.StrictMode>
        <ConfigProvider locale={enUs}>
            <App />
        </ConfigProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

