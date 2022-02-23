import React, { useState } from 'react';
import { Row, Col, Button, Spin, Form, Card, PageHeader, Typography, Input, message, Space, Modal, Select, Upload } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined, InboxOutlined } from "@ant-design/icons";
// import { Link } from 'react-router-dom';
// import { useStore } from "../../utils/useStore";
// import { format } from "date-fns";
// import * as _ from "lodash";
// import * as moment from 'moment';

const { Title } = Typography;
const { TextArea } = Input;
const { confirm } = Modal;
const { Option } = Select;
const { Dragger } = Upload;

export const DocumentForm = observer((props) => {
    const mode = props.mode;
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [FilePath, setFilePath] = useState("");
    const [FileName, setFileName] = useState("");
    // const store = useStore();
    // const [isLoading, setIsLoading] = useState(false);

    const onFinish = (values) => {
        message.success('Document Successfully Added');
        console.log('Success:', values);
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
                navigate(`/company-list`);
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
                            {mode === "edit" ? "Edit Document" : "Add New Document"}
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
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Choose Company"
                                            name="company_category"
                                            rules={[{ required: true, message: 'Please Provide Company Correctly!' }]}
                                        >
                                            <Select defaultValue="Choose Company">
                                                <Option value="disabled" disabled>
                                                    Choose Company
                                                </Option>
                                                <Option value="asa">PT ASA Perkasa</Option>
                                                <Option value="bka">PT BKA</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Select Folder"
                                            name="folder_name"
                                            rules={[{ required: true, message: 'Please Provide Folder Correctly!' }]}
                                        >
                                            <Select defaultValue="Select Folder Destination">
                                                <Option value="disabled" disabled>
                                                    Select Folder Destination
                                                </Option>
                                                <Option value="movie">Movie</Option>
                                                <Option value="musin">Music</Option>
                                                <Option value="misc">Misc</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Document Name"
                                            name="doc_name"
                                            rules={[{ required: true, message: 'Please Provide Document Name Correctly!' }]}
                                        >
                                            <Input placeholder='Name of Document.' />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Select Category"
                                            name="category_name"
                                            rules={[{ required: true, message: 'Please Provide Category Correctly!' }]}
                                        >
                                            <Select defaultValue="Select Category Files">
                                                <Option value="disabled" disabled>
                                                    Select Category File
                                                </Option>
                                                <Option value="pdf">PDF</Option>
                                                <Option value="music">Music</Option>
                                                <Option value="video">Video</Option>
                                                <Option value="misc">Misc</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item
                                    label="Description"
                                    name="category_description"
                                    rules={[{ required: false, message: 'Please Provide Description Correctly!' }]}
                                >
                                    <TextArea rows={4} />
                                </Form.Item>

                                <Form.Item
                                    label="File Document"
                                    name="category_file"
                                    rules={[{ required: true, message: 'Please Provide Document Correctly!' }]}
                                >
                                    <Dragger
                                        name={'file'}
                                        multiple={false}
                                        accept='application/pdf'
                                        // action={`${process.env.REACT_APP_API_URL}/files/`}
                                        showUploadList={false}
                                        // onPreview={handlePreview}
                                        onRemove={() => {
                                            setFilePath(null);
                                            setFileName(null);
                                        }}
                                        onChange={(info) => {
                                            const { status } = info.file;
                                            if (status === 'done') {
                                                setFilePath(info.file.response.path);
                                                setFileName(info.file.response.originalName);
                                            } else if (status === 'error') {
                                                message.error(`${info.file.name} file upload failed.`);
                                            }
                                        }}
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p className="ant-upload-hint">
                                            Please in the form of Document / File format.
                                        </p>
                                    </Dragger>
                                </Form.Item>

                                <p>Preview Disabled.</p>

                                {/* <iframe
                                    title='Document'
                                    src={"123"}
                                    width={"100%"}
                                    style={{ height: 500 }}
                                /> */}

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
