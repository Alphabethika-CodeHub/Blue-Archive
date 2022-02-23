import React, { useState } from 'react';
import { Row, Col, Card, Typography, Tabs, List, Avatar } from 'antd';
import { useStore } from "../../utils/useStore";
import { observer } from "mobx-react-lite";

const { Title } = Typography;
const { TabPane } = Tabs;

export const Dashboard = observer(() => {

    const store = useStore()
    const [tabIsChange, setTabIsChange] = useState(store?.ui?.tabIndex ? store?.ui?.tabIndex : 1);

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
        <div style={{ padding: "24px" }}>
            <Row gutter={24}>
                <Col span={6}>
                    <Card title="Folder A" bordered={true} extra={<a href="#">More</a>}>
                        <Row align='center'>
                            <Title level={2}>10 File</Title>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Folder B" bordered={true} extra={<a href="#">More</a>}>
                        <Row align='center'>
                            <Title level={2}>27 File</Title>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Folder C" bordered={true} extra={<a href="#">More</a>}>
                        <Row align='center'>
                            <Title level={2}>4 File</Title>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Folder D" bordered={true} extra={<a href="#">More</a>}>
                        <Row align='center'>
                            <Title level={2}>87 File</Title>
                        </Row>
                    </Card>
                </Col>
            </Row>

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

        </div>
    );
});
