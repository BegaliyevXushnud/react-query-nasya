
import { useEffect, useState } from "react";
import { useProduct } from "../hooks/queryies";
import { Table, ConfirmDelete, Search } from "@component";
import { Button, Space, Tooltip } from "antd";
import { EditOutlined} from "@ant-design/icons";
import { useSearchParams} from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { TablePaginationConfig } from "antd/lib";
import { useDeleteProduct } from "../hooks/mutations";
import Modal from './drawer'
const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [update, setUpdate] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 5,
  });
  
  
  const { all_products, count }:any = useProduct(params)?.data || {};

 const {mutate} =  useDeleteProduct()

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
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Color",
        dataIndex: "color",
    },
    {
        title: "Model",
        dataIndex: "model",
    },
    {
        title: "Image",
        dataIndex: "image_url",
        render: (text: string) => (
            <img src={text || "../../assets/no_foto.png"} alt="Product" style={{ width: 100, height: 70, objectFit: 'cover' }} />
        ),
    },
    {
        title: "Made in",
        dataIndex: "made_in",
    },
    {
        title: "Action",
        key: "action",
        render: (record: any) => ( // Use 'record' instead of destructuring { id }
            <Space size="middle">
                <Tooltip title="Edit">
                    <Button
                        type="default"
                        onClick={() => editData(record)} // Pass the whole record
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
        data={all_products}
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


