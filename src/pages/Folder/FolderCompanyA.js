import React, { useEffect, useState } from 'react';
import { TableView } from '../../components/Table/TableView';
import { useNavigate } from "react-router-dom";
import { Button, Modal, Spin, Form, Select, Card, PageHeader, Typography, Tag } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';
// import { useStore } from "../../utils/useStore";
// import { format } from "date-fns";
// import * as _ from "lodash";
// import * as moment from 'moment';

const { Title } = Typography;

export const FolderCompanyA = observer((props) => {
    const navigate = useNavigate();
    // const store = useStore();
    const [form] = Form.useForm();
    const [morListSPPBE, setMorListSPPBE] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterQuery, setFilterQuery] = useState({
        morID: localStorage.getItem('morId')
    });
    const [sort, setSort] = useState('');
    const [initialData, setInitialData] = useState({});
    const [filterModal, setFilterModal] = useState(false);
    const [index, setIndex] = useState(null);
    const [page, setPage] = useState(1);
    const [state, setState] = useState({
        agent_name: '',
        status: '',
        no_antrian: '',
    });
    const [filterValues, setFilterValues] = useState([
        { text: "3012", value: 3012 },
        { text: "2816", value: 2816 },
    ]);
    const [filterValuesName, setFilterValuesName] = useState([
        { text: "SPPBE 3", value: "SPPBE 3" },
        { text: "SPPBE Depok", value: "SPPBE Depok" },
    ]);

    // useEffect(() => {
    //     fetchData();
    // }, [filterQuery]);

    // async function fetchData() {
    //     setIsLoading(true)
    //     await Promise.all([
    //         store.mor.getListSPPBE(filterQuery)
    //     ])
    //         .then(() => {
    //             setMorListSPPBE(store.mor?.data_ListSPPBE?.results);
    //         })
    //         .finally(() => setIsLoading(false));
    // }

    // const handleChangeTable = (pagination, filters, sorter) => {
    //     if (pagination) {
    //         store.mor.query.current_page = pagination.current;
    //         store.mor.query.page = pagination.current;
    //         store.mor.query.pageSize = pagination.pageSize;
    //         fetchData();
    //     }
    // }

    let data = [
        {
            document_name: "Close Eyes",
            category: <Tag color="blue">Music</Tag>,
            description: "My Favorite Music Ever!",
            created_at: "1 January 2022",
        },
        {
            document_name: "Ready Player One",
            category: <Tag color="green">Video</Tag>,
            description: "What a Cool Sci-Fi Movie!",
            created_at: "24 January 2022",
        },
        {
            document_name: "SCP Project",
            category: <Tag color="purple">PDF</Tag>,
            description: "My Neighborhood Seems Kinda a Sus.",
            created_at: "29 January 2022",
        },
    ]

    const columns = [
        {
            title: 'No. ',
            dataIndex: index,
            key: index,
            width: 25,
            render: (t, r, index) => `${(page - 1) * 10 + index + 1}`,
        },
        {
            title: 'Document Name',
            dataIndex: 'document_name',
            key: 'document_name',
            width: 50,
            render: (text) => {
                return text || '-'
            }
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: 50,
            render: (text) => {
                return text || '-'
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 50,
            render: (text) => {
                return text || '-'
            }
        },
        {
            title: 'Upload Date',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 50,
            render: (text) => {
                return text || '-'
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: 50,
            align: 'center',
            render: (text, record) =>
                <div style={{ display: 'flex', gap: '1em', justifyContent: "center" }}>
                    <Button
                        className={'button'}
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => navigate('/edit-document')}
                    >
                        {/* Edit */}
                    </Button>
                </div>
        }
    ];

    function onOkFilter() {
        setFilterModal(false);
    }

    function resetFilter() {
        setFilterModal(false);
    }

    function modalFilter() {
        return <Modal
            onCancel={() => setFilterModal(false)}
            maskClosable={false}
            closable={false}
            title={"Filter"}
            visible={filterModal}
            footer={[
                <Button onClick={() => {
                    resetFilter()
                }}>Reset Filter</Button>,
                <Button key="back" onClick={() => setFilterModal(false)}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={() => onOkFilter()}>
                    Filter
                </Button>,
            ]}
        >
            <Form initialValues={initialData} form={form} layout={"vertical"}>
                <Form.Item
                    label='Nama'
                    name='name'
                >
                    <Select
                        mode='multiple'
                        placeholder={'Select Name'}
                        onChange={(value) => {
                            setState({ ...state, name: value });
                        }}
                    >
                        {filterValuesName.map(it => {
                            return <Select.Option value={it?.value}>{it?.text}</Select.Option>;
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label='Code'
                    name='code'
                >
                    <Select
                        mode='multiple'
                        placeholder={'Select Code'}
                        onChange={(value) => {
                            setState({ ...state, code: value })
                        }}
                    >
                        {filterValues.map(it => {
                            return <Select.Option value={it?.value}>{it?.text}</Select.Option>;
                        })}
                    </Select>
                </Form.Item>
                {/* <Form.Item
                   label='Urutkan No Antrian'
                   name='no_antrian'
                >
                   <Select
                       placeholder={'Select Order By'}
                       onChange={(value) => {
                           setState({...state, no_antrian: value})
                       }}
                   >
                       <Option value={'a.created_at'}>Terkecil</Option>
                       <Option value={'-a.created_at'}>Terbesar</Option>
                   </Select>
                </Form.Item> */}
            </Form>
        </Modal>
    }

    return (
        <Spin spinning={isLoading}>

            <Card style={{ borderRadius: "10px 10px 5px 5px" }} bodyStyle={{ padding: 0 }}>
                <PageHeader
                    className={'card-page-header'}
                    extra={
                        <>
                            <Button style={{ marginRight: '1.5em' }} icon={<PlusOutlined />}>
                                <Link to={'/create-document'} style={{ color: "#000000", marginLeft: '8px', padding: '2px' }}>
                                    Add New Document
                                </Link>
                            </Button>
                        </>
                    }

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
                            Folder A
                        </Title>
                    }
                />

                <div style={{ padding: "24px" }}>
                    {modalFilter()}
                    <TableView
                        showKalibrasiBtn={false}
                        showAddBtn={false}
                        showSearchBtn={true}
                        isSelectionTable={true}
                        showExportBtn={false}
                        showPrintBtn={false}
                        scroll={{ x: 'auto' }}
                        columns={columns}
                        rowKey={(record) => record.id}
                        // onChange={handleChangeTable}
                        showFilterBtn={true}
                        onClickFilter={() => setFilterModal(true)}
                        dataSource={data}
                        pagination={{
                            total: data.length,
                            showSizeChanger: true,
                            showTotal: total => `Total ${total} items`,
                            onChange(current) {
                                setPage(current);
                            },
                        }}
                    />
                </div>
            </Card>
        </Spin>
    );
});
