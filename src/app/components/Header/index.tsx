import { Layout, Row, Col, Space, Tooltip } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useNavigate } from 'react-router';
import { path } from 'app/routes/path';

import Logo from '../../../imgs/logo.svg';
import User from '../../../imgs/user.svg';
import Cash from '../../../imgs/cash.svg';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function routerToMyPage() {
    navigate(path.myPage);
  }
  function routerPayment() {
    navigate(path.payment);
  }

  function routerMain() {
    navigate(path.home);
  }
  return (
    <Layout.Header>
      <Row className="text-white container" justify="space-between">
        <Col span={8}>
          <img
            className="cursor-pointer"
            onClick={routerMain}
            src={Logo}
            alt="logo"
          />
        </Col>
        <Col>
          <Space align="center" size={40}>
            <Tooltip title={t(translations.common.cash)}>
              <img
                onClick={routerPayment}
                className="cursor-pointer"
                src={Cash}
                alt="Cash"
              />
            </Tooltip>
            <Tooltip title={t(translations.common.user)}>
              <img
                onClick={routerToMyPage}
                className="cursor-pointer"
                src={User}
                alt="User"
              />
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default memo(Header);
