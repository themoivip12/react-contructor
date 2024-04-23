import { ILogin } from 'types';
import { Controller, useForm } from 'react-hook-form';
import { Input as AntInput, Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import * as yup from 'yup';
import i18next from 'i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { memo } from 'react';

import Input from '../Input';

interface Props {
  onSubmit: (data: ILogin) => void;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .nullable()
    .required(
      i18next.t(translations.common.fieldRequired, {
        field: i18next.t(translations.login.username),
      }),
    ),
  password: yup
    .string()
    .nullable()
    .required(
      i18next.t(translations.common.fieldRequired, {
        field: i18next.t(translations.login.password),
      }),
    ),
});

const LoginForm = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<ILogin>({
    defaultValues: { username: '', password: '' },
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Space direction="vertical" size={20}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t(translations.login.usernamePlaceholder)}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <AntInput.Password
              {...field}
              placeholder={t(translations.login.passwordPlaceholder)}
            />
          )}
        />
        <Button className="mt-5" type="primary" htmlType="submit">
          Login
        </Button>
      </Space>
    </form>
  );
};

export default memo(LoginForm);
