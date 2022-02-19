import React, { useState } from 'react';
import { Modal, Space, Card, Typography, Button, List, Avatar, Descriptions, Badge, message } from 'antd';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useHistory } from 'react-router-dom';
import { useStore } from "../../utils/useStore";

const { Title } = Typography;
const { confirm } = Modal;

export const Account = observer(() => {
    const store = useStore();
    const history = useHistory();

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

    function showDeleteConfirm() {
        confirm({
            title: 'Yakin Ingin Menghapus Pengguna Ini?',
            icon: <ExclamationCircleOutlined />,
            content: 'Perubahan Pada Data Pengguna Tidak Bisa Dikembalikan.',
            onOk() {
                showConfirmConfirm()
            },
            onCancel() {
                console.log('Cancelled by User.');
            },
        });
    }

    function OverrideUser() {
        store.ui.setOverrideUser(1)
        message.success("Successfully Delete User!")
        history.push('/login')
    }

    function showConfirmConfirm() {
        confirm({
            title: `Seriously? You're The Only One!!`,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                OverrideUser();
            },
            onCancel() {
                console.log('Cancelled by User.');
            },
        });
    }

    return (
        <div style={{ padding: "24px" }}>

            <Card style={{ borderRadius: "10px" }}>
                <Descriptions
                    title="User Info"
                    bordered extra={
                        <Space>
                            <Button type="primary">Edit</Button>
                            <Button type="primary">Change Password</Button>
                            <Button type="primary" danger onClick={() => showDeleteConfirm()}>Delete User</Button>
                        </Space>
                    }
                >
                    <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                    <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
                    <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
                    <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                    <Descriptions.Item label="Usage Time" span={2}>
                        2019-04-24 18:00:00
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" text="Running" />
                    </Descriptions.Item>
                    <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                    <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                    <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                    <Descriptions.Item label="Config Info">
                        Data disk type: MongoDB
                        <br />
                        Database version: 3.4
                        <br />
                        Package: dds.mongo.mid
                        <br />
                        Storage space: 10 GB
                        <br />
                        Replication factor: 3
                        <br />
                        Region: East China 1<br />
                    </Descriptions.Item>
                </Descriptions>

                <List
                    style={{ marginTop: 25, backgroundColor: "white" }}
                    header={<div>Log Activities</div>}
                    footer={''}
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description={`${item.desc}`}
                            />
                        </List.Item>
                    )}
                />
            </Card>

        </div>
    );
});
