
import { Button, Form, Input } from 'antd';
import { useSignInMutation } from '../hooks/mutation';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { SignIn } from '../type';
import "./index.css"
const sign_in = () => {
    const { mutateAsync: signIn } = useSignInMutation();
    const handleSubmit = async (values:SignIn) => {
      console.log(values);
      try{
        await signIn(values);
      }catch(err){
        console.log('An error occurred during login:', err);
      }
    };
  return (
    <div className='container'>
      <Form
      name='Login'
      initialValues={{username:'',password:''}}
      onFinish={handleSubmit}
      className='flex flex-col gap-0'
      > 
      <Form.Item
      name='username'
      rules={[
        {required:true,message:'Please input your Phone number!'}
      ]}
      >
      <Input 
      prefix={<UserOutlined className='text-[17px] text-[grey]'/>}
      placeholder='username'
      className='w-full h-[55px]'
      />
      </Form.Item>
      <Form.Item
      name="password"
      rules={[{required:true, message:'Please input your Password!'}]}
      >
        <Input.Password
        prefix={<LockOutlined  className='text-[17px] text-[grey]' />}
        placeholder='password'
        className='w-full h-[55px]'
        />
      </Form.Item>
      <Form.Item className='text-[#000000c4]'>
                <Button
                  block
                  htmlType="submit"
                  className='bg-[#d45b07] text-white p-8 text-[20px]'
                >
                  Log in
                </Button>
                <div className="mt-2 text-center">
                  <a onClick={() => window.location.href='/sign-up'} className='text-[black]'>
                    Register now!
                  </a>
                </div>
              </Form.Item>
      </Form>
    </div>
  )
}

export default sign_in
