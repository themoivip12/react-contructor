import { Link, useNavigate } from 'react-router-dom';
import './sidebar.less';
import { BookOutlined, LogoutOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Avatar, Menu, MenuProps, Typography } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { useAppDispatch, useAppSelector } from 'store/configureStore';

export interface SidebarProps {
  sidebar: boolean;
  handleToggleSidebar?: () => void;
}

const Sidebar = ({ routes }: { routes: any }) => {
  const dispatch = useAppDispatch();
  // const account = useAppSelector(state => state.authentication.account);

  const items = React.useMemo(() => {
    const getItem = (navs: any[]) =>
      navs.reduce((result, item, index) => {
        if (item.roles.length === 0) {
          return result.concat([item]);
        }

        return result;
      }, []);
    return routes.reduce((result: any, item: any, index: number) => {
      if (item.roles.length === 0) {
        return result.concat([item]);
      }

      return result;
    }, []);
  }, []);

  const [current, setCurrent] = useState('1');

  const handleLogout = () => {};
  const navigate = useNavigate();
  const onClickMenu: MenuProps['onClick'] = e => {
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={false}
      style={{ height: '100vh', width: '100px', position: 'fixed' }}
      width={104}
      className="custom-sidebar"
    >
      <div
        onClick={() => {
          navigate('/main');
          setCurrent('1');
        }}
        className="logo-sidebar"
      >
        <BookOutlined />
      </div>
      <Menu
        onClick={onClickMenu}
        selectedKeys={[current]}
        mode="vertical"
        className="menu-sidebar"
        items={items}
        expandIcon={() => <></>}
      />
      <div className="user-sidebar">
        <div className="user-sidebar-avatar">
          <Avatar size={40} icon={<BookOutlined />} src={''} />
          <Typography.Title level={5} className="user-sidebar-avatar-name">
            {'Manhdihoc' || ''}
          </Typography.Title>
          <Link to="/account-management" className="user-sidebar-avatar-manage">
            ádqwe
          </Link>
        </div>
        <div
          className="user-sidebar-logout"
          onClick={() => {
            handleLogout();
          }}
        >
          <LogoutOutlined />
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
