import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useCreateExchange, useUpdateExchange } from "../hooks/mutations";
import { Button, Form, InputNumber, Col, Drawer, Row, message, Select } from "antd";
import { useContracts, useProducts } from "../hooks/queries";
import { ExchangeDataType } from "../type";

const ExchangeDrawer = ({ open, handleCancel, update }: any) => {
  const [form] = useForm();
  const { data: all_contracts = [] } = useContracts();
  const { data: all_products = [] } = useProducts();

  useEffect(() => {
    if (open) {
      if (update) {
        form.setFieldsValue({
          amount: update.amount,
          contract_id: update.contract_id,
          price: update.price,
          product_id: update.product_id,
          status: update.status,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, update, form]);

  const { mutate: createMutate } = useCreateExchange();
  const { mutate: updateMutate } = useUpdateExchange();

  const handleSubmit = (values: ExchangeDataType) => {
    const data: any = {
      amount: values.amount,
      contract_id: values.contract_id,
      price: values.price,
      product_id: values.product_id,
      status: values.status,
    };

    if (update) {
      updateMutate(
        { id: update.id, ...data },
        {
          onSuccess: () => {
            handleCancel();
            form.resetFields();
            message.success("Contract updated successfully!");
          },
        }
      );
    } else {
      createMutate(data, {
        onSuccess: () => {
          handleCancel();
          form.resetFields();
          message.success("Product created successfully!");
        },
        onError: () => {
          message.error("Failed to create product. Please try again.");
        },
      });
    }
  };

  return (
    <Drawer
      title={update ? "Edit Exchange" : "Create a new Exchange"}
      width={720}
      onClose={handleCancel}
      open={open}
    >
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, message: "Please input the Amount!" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please input the Price!" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="contract_id"
              label="Contract"
              rules={[{ required: true, message: "Please select a Contract!" }]}
            >
              <Select placeholder="Select a Contract" size="large">
                {all_contracts.length > 0 ? (
                  all_contracts.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.consumer_name}
                    </Select.Option>
                  ))
                ) : (
                  <Select.Option disabled>No Contract available</Select.Option>
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="product_id"
              label="Product"
              rules={[{ required: true, message: "Please select a Product!" }]}
            >
              <Select placeholder="Select a Product" size="large">
                {all_products.length > 0 ? (
                  all_products.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.consumer_name}
                    </Select.Option>
                  ))
                ) : (
                  <Select.Option disabled>No Product available</Select.Option>
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select a Status!" }]}
            >
              <Select placeholder="Select Status" size="large">
                <Select.Option value="buy">Buy</Select.Option>
                <Select.Option value="sell">Sell</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              {update ? "Update" : "Submit"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default ExchangeDrawer;
