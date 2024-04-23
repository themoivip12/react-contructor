import { Button, Card, Col, Row, Space, Typography } from 'antd';
import { path } from 'app/routes/path';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import { TYPE_OF_WORK } from 'types';
import Input from 'app/components/Input';
import { UserService } from 'app/services';

const Main = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <Row className="w-100" gutter={16} justify={'center'}>
        <Col span={9}>
          <Card className="text-align-center">
            <Space direction="vertical" size={10}>
              <Typography.Title
                level={2}
                className="text-primary"
                style={{ marginBottom: '24px' }}
              >
                Follow your guarantee code right here
              </Typography.Title>
              <Input placeholder="Enter your guarantee number" />
              <div>
                <Typography.Paragraph>
                  Your guarantee code was provided to your mail.
                </Typography.Paragraph>
                <Typography.Paragraph>
                  if you haven't arrive our'mail, please contact phone
                  xxxx-xx-xxxx-xxx
                </Typography.Paragraph>
              </div>
              <Button
                className="mt-5"
                type="primary"
                onClick={() => UserService.getUser('6')}
              >
                Search
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
      <Outlet />
    </div>
  );
};
export default Main;
