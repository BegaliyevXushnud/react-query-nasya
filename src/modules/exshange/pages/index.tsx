import { useEffect, useState } from "react";
import { useExchange } from "../hooks/queries";
import { Table, ConfirmDelete, Search } from "@component";
import { Button, Space, Tooltip } from "antd"; 
import { EditOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { TablePaginationConfig } from "antd/lib";
import { useDeleteExshange } from "../hooks/mutations";
import Modal from './modal';

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [update, setUpdate] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 5,
  });
  const { all_exchanges, count }:any = useExchange(params)?.data || {};
  const { mutate } = useDeleteExshange();

  useEffect(() => {
    const pageFromParams = searchParams.get("page") || "1";
    const limitFromParams = searchParams.get("limit") || "5";
    const searchFromParams = searchParams.get("search") || "";
    setParams((prev) => ({
      ...prev,
      page: Number(pageFromParams),
      limit: Number(limitFromParams),
      search: searchFromParams,
    }));
  }, [searchParams]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 5 } = pagination;
    setSearchParams({
      page: String(current),
      limit: String(pageSize),
    });
  };

  const editData = (data: any) => {
    setUpdate(data);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setUpdate(null);
  };

  const columns: ColumnsType = [
    {
      title: "T/r",
      key: "no",
      render: (_: any, __: any, index: number) => {
        return (params.page - 1) * params.limit + index + 1;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Contract Id",
      dataIndex: "contract_id",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
    },
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Product Id",
      dataIndex: "product_id",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
    },
    
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              type="default"
              onClick={() => editData(record)}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <ConfirmDelete id={record.id} deleteItem={(id: string | number) => mutate(id)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <Modal open={modalVisible} handleCancel={handleCancel} update={update} />
      <div className="flex justify-between p-">
        <Search params={params} setParams={setParams} />
        <Button type="primary" className="btn" onClick={() => setModalVisible(true)}>
          Add Product
        </Button>
      </div>
      <Table
        data={all_exchanges}
        columns={columns}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: count,
          showSizeChanger: true,
          pageSizeOptions: ['2', '5', '7', '10'],
        }}
        handleChange={handleTableChange}
      />
    </div>
  );
};

export default Index;
