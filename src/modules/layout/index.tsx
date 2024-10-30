import React, { useEffect, useState, Suspense } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileProtectOutlined,
  TagsOutlined,
  SettingOutlined,
  // StockOutlined,
  // NotificationOutlined,
  // TagOutlined,
  // AppstoreOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Modal, Space, Select, Tooltip, notification } from 'antd';
import { Outlet, useLocation, NavLink, useNavigate } from 'react-router-dom';
import Najotlogo from '../../assets/097475c6600f6c0a94710e8c33595750.jpg';
import { removeAccessToken } from '../../utils/token-server'; 
import Loading from '../../component/loadable'; // Ensure correct path for Loading
import { getAccessToken } from '../../utils/token-server'; // Import the getAccessToken function

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAccessToken(); // Get the access token
    if (!token) {
      notification.warning({
        message: 'Access Denied',
        description: 'You are being redirected to the login page.',
      });
      navigate('/'); // Redirect to the login page
    }

    const index = admin.findIndex((item) => item.path === pathname);
    if (index !== -1) {
      setSelectedKeys([index.toString()]);
    }
  }, [pathname, navigate]);

  interface AdminType {
    content: string;
    path: string;
    icon: React.ComponentType;
  }

  const admin: AdminType[] = [
    {
      content: "Product",
      path: "/layout",
      icon: FileProtectOutlined,
    },
    {
      content: "Contract",
      path: "/layout/contract",
      icon: SettingOutlined,
    },
    {
      content: "Exchange",
      path: "/layout/exchange",
      icon: TagsOutlined,
    }

  ];

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleLogout = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    removeAccessToken(); 
    navigate("/"); 
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className='min-h-[100vh]'>
        <div />
        <div style={{
          height: '58px',
          margin: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}>
          <img src={Najotlogo} style={{
            maxWidth: '60px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginRight: collapsed ? 0 : '10px',
          }} /> 
          {!collapsed && (
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Najot</span>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
        >
          {admin.map((item, index) => (
            <Menu.Item key={index.toString()} icon={<item.icon />}>
              <NavLink to={item.path} className="text-white hover:text-white focus:text-white">
                {item.content}
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{
          padding: 30,
          background: colorBgContainer,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Space wrap>
            <Select
              defaultValue="en"
              style={{ width: 120 }}
              options={[
                { value: 'en', label: 'English' },
                { value: 'uz', label: 'Uzbek' },
              ]}
            />
            <Tooltip title="Logout" placement="bottom">
              <Button
                type="primary"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                style={{
                  borderRadius: borderRadiusLG,
                  display: 'flex',
                  alignItems: 'center',
                  height: '40px',
                  padding: '0 16px',
                }}
              />
            </Tooltip>
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
      <Modal
        title="Confirmation"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </Layout>
  );
};

export default App;
