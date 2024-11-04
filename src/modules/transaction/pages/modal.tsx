import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useCreateTransaction, useUpdateTransaction } from "../hooks/mutations";
import { Button, Form, InputNumber, Col, Drawer, Row, message, Select } from "antd";
import { useContracts } from "../hooks/queries";
import { TransactionDataType } from "../type";

const ExchangeDrawer = ({ open, handleCancel, update }: any) => {
  const [form] = useForm();
  const { data: all_contracts = [] } = useContracts();

  useEffect(() => {
    if (open) {
      if (update) {
        form.setFieldsValue({
         
          contract_id: update.contract_id,
          price: update.price,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, update, form]);

  const { mutate: createMutate } = useCreateTransaction();
  const { mutate: updateMutate } = useUpdateTransaction();

  const handleSubmit = (values: TransactionDataType) => {
    const data: any = {
        contract_id: values.contract_id,
      price: values.price,
     
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
        </Row>
        <Row gutter={16}>
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
