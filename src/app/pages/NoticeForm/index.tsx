import { useTranslation } from 'react-i18next';

import * as yup from 'yup';

import i18next from 'i18next';

import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router';

import React, { memo, useCallback, useEffect } from 'react';

import { Button, Col, Input, Layout, Radio, Row, Space } from 'antd';

import TextArea from 'antd/es/input/TextArea';

import { Controller, useForm } from 'react-hook-form';

import { notification } from '../../../utils/helpers';

import noticeService from '../../services/api/noticeService';

import { translations } from '../../../locales/translations';

import { path } from '../../routes/path';
import { NOTICE_ORDER, TYPE_OF_NOTICE } from '../../../types';

const schema = yup.object().shape({
  title: yup
    .string()
    .nullable()
    .required(
      i18next.t(translations.common.fieldRequired, {
        field: i18next.t(translations.login.username),
      }),
    ),
  content: yup
    .string()
    .nullable()
    .required(
      i18next.t(translations.common.fieldRequired, {
        field: i18next.t(translations.login.password),
      }),
    ),
});

const NoticeForm = () => {
  const { t } = useTranslation();
  const { id, type, uuid } = useParams();
  const { control, handleSubmit, reset } = useForm<any>({
    defaultValues: {
      title: '',
      content: '',
      notice_order: NOTICE_ORDER.USED,
      notice_type: TYPE_OF_NOTICE.BEFORE_ISSUANCE,
    },
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const submit = useCallback((data: any) => {
    if (id && type) {
      const noticeFormData = new FormData();
      noticeFormData.append('work', id);
      noticeFormData.append('title', data.title);
      noticeFormData.append('content', data.content);
      noticeFormData.append('notice_type', data.notice_type.toString());
      noticeFormData.append('notice_order', data.notice_order.toString());
      if (uuid) {
        updateNotice(noticeFormData, uuid);
      } else {
        createNotice(noticeFormData);
      }
    }
  }, []);
  async function createNotice(noticeFormData: FormData) {
    try {
      if (type === 'novel') {
        const resultCreateNotice = await noticeService.createNovelNotice(
          noticeFormData,
        );
        if (resultCreateNotice) {
          notification.success({
            message: '',
            description: t(translations.notice.message.create.novel),
          });
          navigateBack();
        } else {
          notification.error({
            message: '',
            description: t(translations.notice.message.create.novel),
          });
        }
      } else if (type === 'comic') {
        const resultCreateNotice = await noticeService.createComicNotice(
          noticeFormData,
        );
        if (resultCreateNotice) {
          notification.success({
            message: '',
            description: t(translations.notice.message.create.comic),
          });
          navigateBack();
        } else {
          notification.error({
            message: '',
            description: t(translations.notice.message.create.comic),
          });
        }
      }
    } catch (e: any) {
      notification.error({
        message: 'Close',
        description: e.response.data.message,
      });
      return;
    }
  }
  async function updateNotice(noticeFormData: FormData, uuid: string) {
    try {
      if (type === 'novel') {
        const resultCreateNotice = await noticeService.updateNovelNotice(
          noticeFormData,
          uuid,
        );
        if (resultCreateNotice) {
          notification.success({
            message: '',
            description: t(translations.notice.message.update.comic),
          });
          navigateBack();
        } else {
          notification.error({
            message: '',
            description: t(translations.notice.message.update.comic),
          });
        }
      } else if (type === 'comic') {
        const resultCreateNotice = await noticeService.updateComicNotice(
          noticeFormData,
          uuid,
        );
        if (resultCreateNotice) {
          notification.success({
            message: '',
            description: t(translations.notice.message.update.comic),
          });
          navigateBack();
        } else {
          notification.error({
            message: '',
            description: t(translations.notice.message.update.comic),
          });
        }
      }
    } catch (e: any) {
      notification.error({
        message: '',
        description: e.response.data.message,
      });
      return;
    }
  }
  async function loadNoticeData() {
    try {
      if (uuid) {
        if (type === 'novel') {
          const resultDetailNotice = await noticeService.getDetailNovelNotice(
            uuid,
          );
          if (resultDetailNotice) {
            reset(resultDetailNotice.data);
          }
        } else if (type === 'comic') {
          const resultDetailNotice = await noticeService.getDetailComicNotice(
            uuid,
          );
          if (resultDetailNotice) {
            reset(resultDetailNotice.data);
          }
        }
      }
    } catch (e: any) {
      notification.error({
        message: '',
        description: e.response.data.message,
      });
      return;
    }
  }

  function navigateBack() {
    if (id && type)
      navigate(path.detailNotice.replace(':id', id).replace(':type', type));
  }

  useEffect(() => {
    loadNoticeData();
  }, []);
  return (
    <Layout.Content>
      <form onSubmit={handleSubmit(submit)}>
        <Row gutter={[14, 14]}>
          <Col md={24} sm={24} xs={24}>
            <label className="notice-header">
              {t(translations.notice.header)}
            </label>
          </Col>
          <Col md={24} sm={24} xs={24}>
            <label className="title-16">
              {t(translations.notice.validate.require.title)}
            </label>
          </Col>
          <Col md={24} sm={24} xs={24}>
            <label className="title-14">
              {t(translations.notice.validate.maxLength.title)}
            </label>
          </Col>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                onBlur={e => field.onChange(e.target.value.trim())}
                className="placeholder-left"
                placeholder={t(translations.notice.placeholder)}
                maxLength={30}
                status={!!fieldState.error ? 'error' : ''}
              />
            )}
          />
          <Col md={24} sm={24} xs={24}>
            <label>{t(translations.notice.noticeType.title)}</label>
          </Col>

          <Controller
            name="notice_type"
            control={control}
            render={({ field }) => (
              <Radio.Group {...field}>
                <Radio value={TYPE_OF_NOTICE.BEFORE_ISSUANCE}>
                  {t(translations.notice.noticeType.suspension)}
                </Radio>
                <Radio value={TYPE_OF_NOTICE.ISSUANCE}>
                  {t(translations.notice.noticeType.completion)}
                </Radio>
                <Radio value={TYPE_OF_NOTICE.CANCEL}>
                  {t(translations.notice.noticeType.other)}
                </Radio>
              </Radio.Group>
            )}
          />
          <Col md={24} sm={24} xs={24}>
            <label className="title-16">
              {t(translations.notice.validate.require.content)}
            </label>
          </Col>
          <Col md={24} sm={24} xs={24}>
            <label className="title-14">
              {t(translations.notice.validate.maxLength.content)}
            </label>
          </Col>
          <Controller
            name="content"
            control={control}
            render={({ field, fieldState }) => (
              <TextArea
                {...field}
                className="placeholder-left"
                rows={4}
                status={!!fieldState.error ? 'error' : ''}
                placeholder={t(translations.notice.placeholder)}
                maxLength={2000}
              />
            )}
          />
          <Col md={24} sm={24} xs={24}>
            <label className="title-16">
              {t(translations.notice.reservation.title)}
            </label>
          </Col>
          <Controller
            name="notice_order"
            control={control}
            render={({ field }) => (
              <Radio.Group {...field}>
                <Radio value={NOTICE_ORDER.USED}>
                  {t(translations.notice.reservation.used)}
                </Radio>
                <Radio value={NOTICE_ORDER.NO_USED}>
                  {t(translations.notice.reservation.noUsed)}
                </Radio>
              </Radio.Group>
            )}
          />
          <Col md={24} sm={24} xs={24} className="justify-content-center">
            <Button
              className="btn-notice-cancel"
              onClick={() => navigateBack()}
              shape="round"
            >
              {t(translations.notice.button.cancel)}
            </Button>
            <Button
              className="btn-notice-public"
              htmlType="submit"
              shape="round"
            >
              {t(translations.notice.button.publish)}
            </Button>
          </Col>
        </Row>
      </form>
    </Layout.Content>
  );
};

export default memo(NoticeForm);
