import { useEffect, useState } from "react";
import { useContract } from "../hooks/queries";
import { Table, ConfirmDelete, Search } from "@component";
import { Button, Space, Tooltip, Image } from "antd"; // Import Image from Ant Design
import { EditOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { TablePaginationConfig } from "antd/lib";
import { useDeleteContract } from "../hooks/mutations";
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
  const { all_contracts, count } = useContract(params)?.data || {};
  const { mutate } = useDeleteContract();

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
      title: "Address",
      dataIndex: "consumer_address",
    },
    {
      title: "Name",
      dataIndex: "consumer_name",
    },
    {
      title: "Passport Serial",
      dataIndex: "consumer_passport_serial",
    },
    {
      title: "Phone Number",
      dataIndex: "consumer_phone_number",
    },
    {
      title: "Image",
      dataIndex: "passport_image",
      render: (text: string) => (
        <Image
          width={100}
          height={70}
          src={text || "../../assets/no_foto.png"}
          alt="Product"
          style={{ objectFit: 'cover' }}
        />
      ),
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
        data={all_contracts}
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
