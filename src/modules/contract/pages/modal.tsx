
import { useEffect,useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useCreateContract,useUpdateContract } from "../hooks/mutations";
import { Button, Form, Input, Col, Drawer, Row,  Upload, message} from "antd";
import { uploadFile } from "../../product/service";

const ContractDraver = ({ open, handleCancel, update}:any) => {
    const [form] = useForm();
    const [passport_image, setPassport_image] = useState<string | null>(null);
    useEffect(() => {
        if(open){
            if(update){
                form.setFieldsValue({
                    consumer_address: update.consumer_address,
                    consumer_name: update. consumer_name,
                    consumer_passport_serial:update.consumer_passport_serial,
                    consumer_phone_number:update.consumer_phone_number,
                    passport_image:update.passport_image
                });
               setPassport_image(update.passport_image || null)
            }else{
                form.resetFields();
                setPassport_image(null)
            }
        }

    },[open, update, form]);
    const {mutate:createMutate}=  useCreateContract();
const {mutate:updateMutate}=  useUpdateContract();

const handleSubmit = (values:any)=>{
    if(!passport_image && !update){
        message.error("Please upload an image before submitting.");
        return;
    }
    const data: any = {
        consumer_address: values.consumer_address, // Bu to'g'ri bo'lishi kerak
        consumer_name: values.consumer_name,
        consumer_passport_serial: values.consumer_passport_serial,
        consumer_phone_number: values.consumer_phone_number,
        passport_image: passport_image || values.passport_image // passport_image ni to'g'ri olish
    };
    
    if(update){
        updateMutate({id:update.id,...data},{
            onSuccess:() => {
                handleCancel();
                form.resetFields();
                setPassport_image(null);
                message.success("Contract updated successfully!")
            },
            onError:() => {
                message.error("Failed to update product. Please try again.")
            }
        });
    }else{
        createMutate(data,{
            onSuccess:()=> {
                handleCancel();
                form.resetFields();
                setPassport_image(null);
                message.success("Product created successfully!")
            },
            onError:() => {
                message.error("Failed to create product. Please try again.")
            }
        });
    }
};

const handleFileChange = async (info:any) => {
    const selectedFile = info.file.originFileObj || info.file;
    try{
        const uploadedFileResponse = await uploadFile(selectedFile);
        const uploadedImageUrl = uploadedFileResponse.made_url;
        setPassport_image(uploadedImageUrl);
        message.success("File uploaded successfully!")
    }catch(error){
        message.error("File upload failed. Please try again.")
    }
};

return(
    <Drawer 
    title={update ? "Edit Contract" : "Create a new Contract"}
    width={720}
    onClose={handleCancel}
    open={open}
    >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
       <Row gutter={16}>
        <Col span={12}>
        <Form.Item name="consumer_address" label="Consumer Address" rules={[{ required: true, message: "Please input the Consumer Address!" }]}>
    <Input />
</Form.Item>

        </Col>
        <Col span={12}>
        <Form.Item name="consumer_name" label=" Consumer Name" rules={[{ required: true, message: "Please input the Consumer Name!" }]}>
        <Input/>
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item name="consumer_passport_serial" label=" Consumer Passport Serial" rules={[{ required: true, message: "Please input the  Consumer Passport Serial!" }]}>
        <Input/>
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item name="consumer_phone_number" label=" Consumer Phone Number" rules={[{ required: true, message: "Please input the  Consumer Phone Number!" }]}>
        <Input/>
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
)
}

export default ContractDraver