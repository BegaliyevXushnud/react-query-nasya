import { useEffect, useState } from "react";
import { Button, Form, Input, Col, Drawer, Row, Select, Upload, DatePicker, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useCreateProduct, useUpdateProduct } from "../hooks/mutations";
import moment from "moment";
import { uploadFile } from "../service";
const { Option } = Select;

const ProductDrawer = ({ open, handleCancel, update }: any) => {
    const [image_url, setImageUrl] = useState<string | null>(null);
    const [form] = useForm();

    useEffect(() => {
        if (open) {
            if (update) {
                form.setFieldsValue({
                    name: update.name,
                    color: update.color,
                    model: update.model,
                    made_in: update.made_in,
                    date_of_creation: update.date_of_creation ? moment(update.date_of_creation) : null,
                });
                setImageUrl(update.image_url || null);
            } else {
                form.resetFields();
                setImageUrl(null);
            }
        }
    }, [open, update, form]);
    
    
    

    const { mutate: createMutate } = useCreateProduct();
    const { mutate: updateMutate } = useUpdateProduct();

    const handleSubmit = (values: any) => {
        if (!image_url && !update) {
            message.error("Please upload an image before submitting.");
            return;
        }

        const data: any = {
            color: values.color,
            date_of_creation: values.date_of_creation,
            made_in: values.made_in,
            model: values.model,
            name: values.name,
            image_url: image_url || values.image_url, 
        };

        if (update) {
            updateMutate({ id: update.id, ...data }, {
                onSuccess: () => {
                    handleCancel();
                    form.resetFields();
                    setImageUrl(null);
                    message.success("Product updated successfully!");
                },
                onError: () => {
                    message.error("Failed to update product. Please try again.");
                }
            });
        } else {
            createMutate(data, {
                onSuccess: () => {
                    handleCancel();
                    form.resetFields();
                    setImageUrl(null);
                    message.success("Product created successfully!");
                },
                onError: () => {
                    message.error("Failed to create product. Please try again.");
                }
            });
        }
    };

    const handleFileChange = async (info: any) => {
        const selectedFile = info.file.originFileObj || info.file;
        try {
            const uploadedFileResponse:any = await uploadFile(selectedFile);
            const uploadedImageUrl = uploadedFileResponse.made_url;
            setImageUrl(uploadedImageUrl);
            message.success("File uploaded successfully!");
        } catch (error) {
            message.error("File upload failed. Please try again.");
        }
    };

    return (
        <Drawer
            title={update ? "Edit Product" : "Create a new product"}
            width={720}
            onClose={handleCancel}
            open={open}
        >
            <Form layout="vertical" onFinish={handleSubmit} form={form}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="color" label="Color" rules={[{ required: true, message: "Please select the color!" }]}>
                            <Select placeholder="Select a color">
                                <Option value="red">Red</Option>
                                <Option value="blue">Blue</Option>
                                <Option value="green">Green</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="date_of_creation"
                            label="Date of Creation"
                            rules={[{ required: true, message: "Please select the creation date!" }]}
                        >
                            <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>
                    </Col>
                    {!update && (
                        <Col span={12}>
                            <Form.Item
                                name="file"
                                label="Image"
                                rules={[{ required: true, message: 'Please upload an image' }]}
                            >
                                <Upload
                                    onChange={handleFileChange}
                                    beforeUpload={() => false}
                                    showUploadList={false}
                                >
                                    <Button>Click to Upload</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    )}
                    <Col span={12}>
                        <Form.Item
                            name="made_in"
                            label="Made In"
                            rules={[{ required: true, message: 'Please enter product made in' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="model"
                            label="Model"
                            rules={[{ required: true, message: 'Please enter product model' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter product name' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            {update ? "Update" : "Submit"}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
};

export default ProductDrawer;
