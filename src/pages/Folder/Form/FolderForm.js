import React from 'react';
import { Row, Col, Button, Spin, Form, Card, PageHeader, Typography, Input, message, Space, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
// import { Link } from 'react-router-dom';
// import { useStore } from "../../utils/useStore";
// import { format } from "date-fns";
// import * as _ from "lodash";
// import * as moment from 'moment';

const { Title } = Typography;
const { TextArea } = Input;
const { confirm } = Modal;

export const FolderForm = observer((props) => {
    const mode = props.mode;
    const [form] = Form.useForm();
    const history = useHistory();
    // const store = useStore();
    // const [isLoading, setIsLoading] = useState(false);

    const onFinish = (values) => {
        message.success('Folder Successfully Added');
        console.log('Success:', values);
        history.push(`/folder-list`);
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function showBackConfirm() {
        confirm({
            title: 'Cancel Form?',
            icon: <ExclamationCircleOutlined />,
            content: 'Changes to the form are non-refundable..',
            onOk() {
                history.push(`/company-list`);
            },
            onCancel() {
                console.log('Cancelled by User.');
            },
        });
    }

    function showResetConfirm() {
        confirm({
            title: 'Reset Form?',
            icon: <ExclamationCircleOutlined />,
            content: 'Changes to the form are non-refundable..',
            onOk() {
                form.resetFields()
            },
            onCancel() {
                console.log('Cancelled by User.');
            },
        });
    }

    return (
        <Spin spinning={false}>
            <Card style={{ borderRadius: "10px 10px 5px 5px" }} bodyStyle={{ padding: 0 }}>
                <PageHeader
                    className={'card-page-header'}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'nowrap',
                        gap: '1em',
                        backgroundColor: "#0092CE",
                        padding: '24px',
                        borderRadius: "10px 10px 0 0"
                    }}
                    title={
                        <Title
                            style={{
                                color: "white",
                                fontSize: '30px',
                                margin: '0',
                                fontWeight: '500',
                                marginRight: '2em',
                                marginLeft: "1em"
                            }}
                        >
                            {mode === "edit" ? "Edit Folder" : "Add New Folder"}
                        </Title>
                    }
                />

                <div style={{ padding: "24px" }}>
                    <Row gutter={24} justify='center'>
                        <Col span={18}>
                            <Form
                                form={form}
                                layout='vertical'
                                name="basic"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Folder Name"
                                    name="folder_name"
                                    rules={[{ required: true, message: 'Please Provide Folder Name Correctly!' }]}
                                >
                                    <Input placeholder='Fill in Folder Name.' />
                                </Form.Item>

                                <Form.Item
                                    label="Description"
                                    name="folder_description"
                                >
                                    <TextArea rows={4} />
                                </Form.Item>

                                {
                                    mode === "edit" ?
                                        <Form.Item>
                                            <Space>
                                                <Button type="primary" htmlType="submit">
                                                    Save Changes
                                                </Button>
                                                <Button onClick={() => showBackConfirm()}
                                                >
                                                    Cancel
                                                </Button>
                                            </Space>
                                        </Form.Item> :
                                        <Form.Item>
                                            <Space>
                                                <Button type="primary" htmlType="submit">
                                                    Submit
                                                </Button>
                                                <Button onClick={() => showBackConfirm()}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button type="primary" danger onClick={() => showResetConfirm()}>
                                                    Reset
                                                </Button>
                                            </Space>
                                        </Form.Item>
                                }
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Card>
        </Spin>
    );
});
