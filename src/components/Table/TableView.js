import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Col, Input, Row, Table, Typography, DatePicker } from 'antd';
import {
    FilterOutlined,
    ExportOutlined,
    PlusOutlined,
    PrinterOutlined,
    SwapOutlined,
    DeleteOutlined,
    CloseOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

export const TableView = observer((props) => {
    const {
        placeholder,
        title,
        nameBtnAdd,
        className,
        scroll,
        nameBtnSet,
        columns = [],
        dataSource = [],
        addStyle = {

        },
        onClickAdd = () => {
        },
        onClickFilter = () => {
        },
        onClickKalibrasi = () => {
        },
        onClickPrint = () => {
        },
        onClickExport = (selectedRowKeys) => {
        },
        onClickMove = (selectedRowKeys) => {
        },
        onSearchBtnClick = (value) => {
        },
        onFilterBtnDate = (value) => {
        },
        onClickDelete = () => {
        },
        onDebugRefresh = () => {
        },
        OVERRIDE_STYLE = false,
        showDebugRefreshBtn = false,
        showToolbar = true,
        showExtra = true,
        showTitle = true,
        showAddBtn = true,
        showFilterBtn = true,
        showSearchBtn = true,
        showSearchBtnNopolOnly = false,
        showSearchBtnLOOnly = false,
        showSearchBtnOnly = false,
        showDateFilter = false,
        showExportBtn = true,
        showPrintBtn = false,
        showMoveBtn = false,
        showSetButton = false,
        showAddOutstandingBtn = false,
        showKalibrasiBtn = false,
        showDeleteBtn = false,
        showEndProduksi = false,
        isExpandTable = false,
        componentExpand,
        isSelectionTable = false,
        selectionType = "checkbox",
        isClickedRow = false,
        onClickedRow = () => {
        },
        pagination,
        onChange,
        current
    } = props;

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const expandedRowRender = (e) => {
        return componentExpand;
    };

    const rowSelection = {
        type: selectionType,
        onChange: (selectedRowKeys, selectedRow) => {
            setSelectedRowKeys(selectedRowKeys);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log({ selectedRows })
        }
    };

    const extraProps = () => {
        let objProps = {};
        if (isExpandTable) {
            objProps.expandable = { expandedRowRender };
        }
        if (isSelectionTable) {
            objProps.rowSelection = { ...rowSelection };
        }
        if (isClickedRow) {
            objProps.onRow = onClickedRow;
        }
        return objProps;
    };

    const styles = {
        rowExtra: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: localStorage.getItem('role') === 'SUPERUSER' || localStorage.getItem('role') === 'SUPERADMIN' ? 0
                : OVERRIDE_STYLE === false ? 25 : 0
        },
        rowHeader: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: '1.5em',
            margin: 0
        },
        rowToolbar: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 10,
            justifyContent: 'space-between'
        },
        colToolbar: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: '1.5em'
        },
        title: {
            fontSize: '80px',
            margin: 0,
            fontWeight: 500
        }
    }

    return (
        <div>
            {showExtra && (
                <Row gutter={[16, 16]} style={styles.rowExtra}>
                    {showTitle && (
                        <Col>
                            <Title style={styles.title}>{title || null}</Title>
                        </Col>
                    )}
                    <Row gutter={[16, 16]}
                        style={styles.rowHeader}>
                        {showDebugRefreshBtn && (
                            <Col>
                                <Button
                                    style={{
                                        width: '100%',
                                        background: "#000000",
                                        color: 'white',
                                    }}
                                    onClick={onDebugRefresh}
                                >
                                    <span>
                                        <PlusOutlined style={{ marginRight: 5 }} />
                                    </span>
                                    {'Force Refresh Table'}
                                </Button>
                            </Col>
                        )}
                        {showKalibrasiBtn && (
                            <Col>
                                <Button
                                    type='primary'
                                    style={{
                                        width: '100%',
                                        color: '#fff',
                                    }}
                                    onClick={onClickKalibrasi}
                                >
                                    <span>
                                        <PlusOutlined style={{ marginRight: 5 }} />
                                    </span>
                                    {'Kalibrasi Data Awal'}
                                </Button>
                            </Col>
                        )}
                        {showAddBtn && (
                            <Col>
                                <Button
                                    style={{
                                        width: '100%',
                                        color: '#00000',
                                    }}
                                    type={localStorage.getItem('role') === 'SUPERUSER' ? 'primary' : null}
                                    onClick={onClickAdd}
                                >
                                    <span>
                                        <PlusOutlined style={{ marginRight: 5 }} />
                                    </span>
                                    {nameBtnAdd || 'Add'}
                                </Button>
                            </Col>
                        )}
                    </Row>
                </Row>
            )}
            {showToolbar && (
                <Row gutter={[16, 16]} style={styles.rowToolbar}>
                    <Col style={styles.colToolbar}>
                        {showDateFilter && (
                            <Col>
                                <RangePicker showTime={{ format: 'HH:mm' }} format="DD-MM-YYYY HH:mm"
                                    onChange={onFilterBtnDate} onOk={(e) => console.log("RANGE PICKER", e)} />
                            </Col>
                        )}
                        {showSearchBtn && (
                            <Col>
                                <Search placeholder={placeholder || 'Search Document'} allowClear
                                    onSearch={onSearchBtnClick} style={{ width: 200 }} />
                            </Col>
                        )}
                        {showSearchBtnNopolOnly && (
                            <Col>
                                <Search placeholder={placeholder || 'Search Nopol'} allowClear
                                    onSearch={onSearchBtnClick} style={{ width: 200 }} />
                            </Col>
                        )}
                        {showSearchBtnLOOnly && (
                            <Col>
                                <Search placeholder={placeholder || 'Search LO'} allowClear
                                    onSearch={onSearchBtnClick} style={{ width: 200 }} />
                            </Col>
                        )}
                        {showSearchBtnOnly && (
                            <Col>
                                <Search placeholder={placeholder || 'Search'} allowClear
                                    onSearch={onSearchBtnClick} style={{ width: 200 }} />
                            </Col>
                        )}

                    </Col>
                    <Col style={styles.colToolbar}>
                        {showDeleteBtn && (
                            <Col>
                                <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() => onClickDelete(selectedRowKeys)}
                                >
                                    Delete LO
                                </Button>
                            </Col>
                        )}

                        {showEndProduksi && (
                            <Col>
                                <Button
                                    icon={<CloseOutlined />}
                                    onClick={() => onClickDelete(selectedRowKeys)}
                                >
                                    Akhiri Produksi
                                </Button>
                            </Col>
                        )}

                        {showSetButton && (
                            <Col>
                                <Button
                                    type='primary'
                                    style={{
                                        width: '100%',
                                        color: '#fff',
                                    }}
                                    onClick={onClickAdd}
                                >
                                    <span>
                                        <PlusOutlined style={{ marginRight: 5 }} />
                                    </span>
                                    {nameBtnSet}
                                </Button>
                            </Col>
                        )}
                        {showAddOutstandingBtn && (
                            <Col>
                                <Link to="/admin/data-lo/form-add-outstanding">
                                    <Button type="primary">
                                        Tambah Data Outstanding
                                    </Button>
                                </Link>
                            </Col>
                        )}
                        {showFilterBtn && (
                            <Col>
                                <Button onClick={onClickFilter}>
                                    <span>
                                        <FilterOutlined style={{ marginRight: 5 }} />
                                    </span>
                                    Filter
                                </Button>
                            </Col>
                        )}
                        {showPrintBtn && (
                            <Col>
                                <Button onClick={() => {
                                    onClickPrint(selectedRowKeys)
                                }}>
                                    <span>
                                        <PrinterOutlined style={{ marginRight: 5 }} />
                                    </span>
                                    Print Data
                                </Button>
                            </Col>
                        )}
                        {showMoveBtn && (
                            <Col>
                                <Button onClick={() => onClickMove(selectedRowKeys)}>
                                    <span>
                                        <SwapOutlined style={{ marginRight: 5 }} />
                                    </span>
                                    Move data LO Harian
                                </Button>
                            </Col>
                        )}
                        {showExportBtn && (
                            <Col>
                                <Button onClick={() => onClickExport(selectedRowKeys)}>
                                    <span>
                                        <ExportOutlined style={{ marginRight: 5 }} />
                                    </span>
                                    Export Data
                                </Button>
                            </Col>
                        )}
                    </Col>
                </Row>
            )}
            <Row gutter={16}>
                <Col span={24}>
                    {/* <Table style={{ marginTop: '1em' }} className={className} scroll={scroll} dataSource={dataSource} */}
                    <Table style={addStyle !== {} ? addStyle : { marginTop: '1em' }} className={className} scroll={scroll} dataSource={dataSource}
                        columns={columns} {...extraProps()} pagination={pagination} onChange={onChange}
                        current={current} />
                </Col>
            </Row>
        </div>
    );
});
