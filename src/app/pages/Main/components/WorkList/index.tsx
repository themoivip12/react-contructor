import { Col, Row, Typography } from 'antd';
import { translations } from 'locales/translations';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { IPageable, IWork } from 'types';

import CreateIcon from '../../../../../imgs/plus.svg';
import DefaultPresentImage from '../../../../../imgs/default-represent-image.png';

interface Props {
  workPageable: IPageable<IWork>;
  onClickItem: (item: IWork) => void;
  onClickCreate: () => void;
}

const WorkList = ({ workPageable, onClickItem, onClickCreate }: Props) => {
  const { t } = useTranslation();
  return (
    <Row
      className="mt-24"
      gutter={[
        { xs: 16, sm: 20, lg: 29 },
        { xs: 20, sm: 20, lg: 29 },
      ]}
    >
      {workPageable.results.map(item => (
        <Col xs={8} md={6} lg={4} key={item.uuid}>
          <div className="card h-100" onClick={() => onClickItem(item)}>
            <img
              className="card-img"
              src={item.represent_image_large || DefaultPresentImage}
              alt={item.title}
            />
            <div className="card-content">
              <p className="body2 card-sub-title">{item.category?.name}</p>
              <p className="body1 card-title">{item.title}</p>
            </div>
          </div>
        </Col>
      ))}
      <Col xs={8} md={6} lg={4}>
        <div className="card card-img card-create" onClick={onClickCreate}>
          <img className="icon" src={CreateIcon} alt={'새 작품 쓰기'} />
          <p className="body-2">{t(translations.main.create)}</p>
        </div>
      </Col>
    </Row>
  );
};

export default memo(WorkList);
