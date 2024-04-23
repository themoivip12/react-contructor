import { Button, Col, Row, Space } from 'antd';
import { useCallback, useEffect } from 'react';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

import { useForm, FormProvider } from 'react-hook-form';
import SelectRepresentImageFields from 'app/components/SelectRepresentImageFields';
import { useDispatch, useSelector } from 'react-redux';
import { path } from 'app/routes/path';
import { useNavigate, useParams } from 'react-router';
import { get } from 'lodash';
import { WHETHER_THE_WORK } from 'types';

import WorkForm from '../components/Form';

import { ICreateWorkForm } from '../slice/type';
import { mainSelector } from '../slice/selector';

const UpdateWork = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, type } = useParams();

  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const submit = useCallback(
    (data: ICreateWorkForm) => {
      if (!id || !type) return;
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        get(data, key) && formData.append(key, get(data, key));
      });
      formData.append('short_description', 'short_description');
    },
    [dispatch, id, navigate, type],
  );

  useEffect(() => {
    if (!id || !type) return;
  }, [dispatch, id, type]);

  const { workDetail } = useSelector(mainSelector);

  useEffect(() => {
    if (workDetail)
      reset({
        ...workDetail,
        type:
          type === path.novel
            ? WHETHER_THE_WORK.NOVEL
            : WHETHER_THE_WORK.WEB_TOON,
      });
  }, [workDetail, reset]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Space size={20} direction="vertical" className="w-100">
        <p className="h2">{t(translations.main.create)}</p>
        <FormProvider {...methods}>
          <Space size={20} direction="vertical" className="w-100">
            <Row gutter={[14, 14]}>
              <Col xs={24}>
                <p className="h3">{t(translations.main.updateTitle)}</p>
              </Col>
              <SelectRepresentImageFields />
            </Row>
            <WorkForm />
          </Space>
        </FormProvider>

        <Space
          size={12}
          direction="horizontal"
          align="center"
          className="w-100 justify-center"
        >
          <Button
            type="ghost"
            onClick={() =>
              id &&
              type &&
              navigate(
                path.detailEpisode.replace(':id', id).replace(':type', type),
              )
            }
          >
            {t(translations.common.cancel)}
          </Button>
          <Button htmlType="submit" type="primary">
            {t(translations.main.updateWork)}
          </Button>
        </Space>
      </Space>
    </form>
  );
};
export default UpdateWork;
