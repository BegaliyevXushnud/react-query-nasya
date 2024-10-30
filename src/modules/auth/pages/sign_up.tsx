import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import { FaCity, FaLandmark, FaMonument, FaTree, FaMountain, FaWater } from 'react-icons/fa';
import { useState } from 'react';
import { useSignUpMutation as useSignUp } from '../hooks/mutation';
import type { SignUp } from '../type';
import "./index.css"

const { Option } = Select;

const Index = () => {
  const [form] = Form.useForm();
  const { mutate, isPending } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values: SignUp) => {
   
    const phone = "+998" + values.phone_number.replace(/\D/g, '');
    const payload = { ...values, phone_number: phone };
    mutate(payload);
  };

  const validatePhoneNumber = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue.length === 9;
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 9);
    const formatted = cleaned.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, ' $1 $2 $3 $4');
    return formatted;
  };

  const handlePhoneNumberChange = (e: any) => {
    form.setFieldsValue({
      phone_number: formatPhoneNumber(e.target.value)
    });
  };

  return (
    <div className='container'>
      <Form form={form} onFinish={handleSubmit}>
       {/* <div className='brand-logo'>
        <img src={loginimg} alt="" />
       </div> */}
        <Form.Item
          name="address"
          rules={[{ required: true, message: 'Please select your address!' }]}
        >
          <Select placeholder="Select Address" className="w-full h-[50px]">
          <Option value="tashkent">
              <FaCity className="inline mr-2 text-[17px] text-[grey]" /> Toshkent
            </Option>
            <Option value="samarkand">
              <FaLandmark className="inline mr-2 text-[17px] text-[grey]" /> Samarqand
            </Option>
            <Option value="bukhara">
              <FaMonument className="inline mr-2 text-[17px] text-[grey]" /> Buxoro
            </Option>
            <Option value="andijan">
              <FaTree className="inline mr-2 text-[17px] text-[grey]" /> Andijon
            </Option>
            <Option value="fergana">
              <FaMountain className="inline mr-2 text-[17px] text-[grey]" /> Farg‘ona
            </Option>
            <Option value="namangan">
              <FaTree className="inline mr-2 text-[17px] text-[grey]" /> Namangan
            </Option>
            <Option value="kashkadarya">
              <FaWater className="inline mr-2 text-[17px] text-[grey]" /> Qashqadaryo
            </Option>
            <Option value="surkhandarya">
              <FaMountain className="inline mr-2 text-[17px] text-[grey]" /> Surxondaryo
            </Option>
            <Option value="navoiy">
              <FaMonument className="inline mr-2 text-[17px] text-[grey]" /> Navoiy
            </Option>
            <Option value="khorezm">
              <FaLandmark className="inline mr-2 text-[17px] text-[grey]" /> Xorazm
            </Option>
            <Option value="jizzakh">
              <FaTree className="inline mr-2 text-[17px] text-[grey]" /> Jizzax
            </Option>
            <Option value="karakalpakstan">
              <FaMountain className="inline mr-2 text-[17px] text-[grey]" /> Qoraqalpog‘iston
            </Option>
            <Option value="sirdaryo">
              <FaWater className="inline mr-2 text-[17px] text-[grey]" /> Sirdaryo
            </Option>
            {/* Add other options here */}
          </Select>
        </Form.Item>

        {/* Email Input */}
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            prefix={<MailOutlined className="text-[17px] text-[grey]" />}
            placeholder="admin07@gmail.com"
            className="w-full h-[50px]"
            type="email"
          />
        </Form.Item>

        {/* Full Name Input */}
        <Form.Item
          name="full_name"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input
            prefix={<UserOutlined className="text-[17px] text-[grey]" />}
            placeholder="Full Name"
            className="w-full h-[50px]"
          />
        </Form.Item>

        {/* Password Input */}
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input
            prefix={<LockOutlined className="text-[17px] text-[grey]" />}
            placeholder="Password"
            className="w-full h-[50px]"
            type={showPassword ? 'text' : 'password'}
            suffix={
              <Button type="link" onClick={togglePasswordVisibility}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            }
          />
        </Form.Item>

        {/* Phone Number Input */}
        <Form.Item
          name="phone_number"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            () => ({
              validator(_, value) {
                return validatePhoneNumber(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error('Invalid phone number!'));
              },
            }),
          ]}
        >
          <Input
            prefix={
              <div className="flex items-center">
                <PhoneOutlined className="text-[17px] text-[grey] mr-2" />
                <span className="text-[17px] text-[grey]">+998</span>
              </div>
            }
            placeholder="99 688 17 06"
            className="w-full h-[50px]"
            value={form.getFieldValue('phone_number')}
            onChange={handlePhoneNumberChange}
          />
        </Form.Item>

        {/* Username Input */}
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            prefix={<UserOutlined className="text-[17px] text-[grey]" />}
            placeholder="Username"
            className="w-full h-[50px]"
          />
        </Form.Item>

        {/* Register Button */}
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className="bg-[#d45b07] text-white p-8 text-[17px]"
            loading={isPending}
          >
            Register
          </Button>
          <div className="mt-2 text-center">
            <a href="/" className="text-black">
              Sign-in!
            </a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;
