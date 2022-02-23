import React, { useState } from "react";
import { observer } from 'mobx-react-lite';
import { useStore } from "../../utils/useStore";
import { Button, Card, Col, Form, Input, Row, message, } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

export const Login = observer(() => {
    const store = useStore();
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    const onFinish = async values => {
        try {

            const values = await form.validateFields();

            if (values.remember) {
                localStorage.setItem('email', values.email);
            }

            // const data = {
            //     email: values.email,
            //     password: values.password,
            // };

            setLoading(true);

            localStorage.setItem("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhMjc1MTc3LWI3MGUtNDRjZC1hYTdmLTJjYTJkNmEwZWU1MiIsImVtYWlsIjoibW9yMUBnbWFpbC5jb20iLCJuYW1lIjoiTU9SIDEiLCJyb2xlIjoiU1VQRVJBRE1JTiIsInNwcGJlSWQiOm51bGwsIm1vcklkIjoiYzM3Yzg2NWMtN2YzNC00ZTliLTllZjctZmM4OGRmMDY0NzExIiwiaWF0IjoxNjQzMzQxMjY1fQ.p5QoQikjvmMyCpO8YClsEJHLAtkQ3CVoFYlLW3LnSYo")
            localStorage.setItem("role", "ADMIN")
            // await store.authentication.login(data)
            // if (store.authentication.dataUser === 'ADMIN') {
            //     navigate.replace('/dashboard')
            // } else if (store.authentication.dataUser === 'USER') {
            //     navigate.replace('/dashboard')
            // } else {
            //     navigate.replace("/dashboard");
            // }
            navigate("/dashboard", { replace: true });


            setLoading(false);

        } catch (err) {

            setLoading(false);
            if (err.response?.body.message) {
                message.error(err.response?.body.message)
            } else {
                message.error(err.message)
            }

        }

        console.log('Success:', values);
    };

    return <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        }}>
        <Row
            justify={'center'}
        >
            <Col>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Card
                        style={{
                            width: 320,
                            textAlign: 'center',
                            fontSize: 13,
                            fontWeight: 200,
                            marginTop: '150px'
                        }}
                        bordered={true}
                        title={'Sign in to your account'}
                    >
                        <Form
                            form={form}
                            layout={'vertical'}
                            name="normal_login"
                            className="login-form"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                size={'large'}
                                rules={[{ required: false, message: 'Please input your Username!' }]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" style={{ color: '#1890FF' }} />}
                                    type="text"
                                    placeholder="username: admin or user" />
                            </Form.Item>

                            <Form.Item
                                style={{
                                    marginBottom: 0,
                                }}
                                label="Password"
                                name="password"
                                size={'large'}
                                rules={[{ required: false, message: 'Please input your Password!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" style={{ color: '#1890FF' }} />}
                                    type="password"
                                    placeholder="enter your password"
                                />
                            </Form.Item>

                            <Form.Item
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    textAlign: 'left'
                                }}>
                            </Form.Item>

                            <Form.Item
                                style={{
                                    marginBottom: 0,
                                }}>

                                {store.ui.user !== 1 ? <Button
                                    type="primary"
                                    block
                                    loading={loading}
                                    htmlType="submit"
                                    size={'large'}
                                    onSubmit={onFinish}
                                    className="login-form-button"
                                >
                                    Sign In
                                </Button> : <Button
                                    type="primary"
                                    block
                                    size={'large'}
                                    className="login-form-button"
                                    onClick={() => message.warning("Go Away.. You Just Deleted The Only One User.")}
                                >
                                    Sign In
                                </Button>}

                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </Col>
        </Row>
    </div>;
});
