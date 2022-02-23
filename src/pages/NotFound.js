import React from "react";
import { observer } from 'mobx-react-lite';
import { Button, Card, Col, Typography, Image, Row } from 'antd';
import { ArrowLeftOutlined } from "@ant-design/icons";
import NotFoundPict from "../Assets/ey_not_found.png";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export const NotFoundPage = observer(() => {
    const navigate = useNavigate();

    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh", marginTop: "auto" }}>
        <Row justify={'center'}>
            <Col span={12}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Card style={{ borderRadius: "15px" }}>
                        <div style={{ padding: "24px" }}>
                            <Row gutter={24} justify="center">
                                <Col>
                                    <Image preview={false} style={{ width: '100%' }} src={NotFoundPict} />
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "24px" }} gutter={24} justify="center">
                                <Col>
                                    <Title>404 Page Not Found</Title>
                                </Col>
                            </Row>
                            <Row gutter={24} justify="center">
                                <Col>
                                    <Button
                                        type="link"
                                        onClick={() => navigate("/dashboard", { replace: true })}
                                    >
                                        <ArrowLeftOutlined /> Back to Homepage
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </div>
            </Col>
        </Row>

    </div>;
});