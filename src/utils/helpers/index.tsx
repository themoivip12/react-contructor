import { Button, notification as antdNotification } from 'antd';
import { get } from 'lodash';

interface NotificationProps {
  message?: string;
  description: string;
}

export function currencyFormat(x?: number) {
  if (!x) {
    return '0';
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// export const sortDays = function (a: string, b: string) {
//   const indexOfA = Object.values(Weekdays).indexOf(a as Weekdays);
//   const indexOfB = Object.values(Weekdays).indexOf(b as Weekdays);
//   return indexOfA - indexOfB;
// };

export const notification = {
  error: ({ message, description }: NotificationProps) => {
    const key = `open${Date.now()}`;
    const btn = message ? (
      <div style={{ margin: '0 15px' }}>
        <Button
          type="primary"
          shape="round"
          block
          onClick={() => antdNotification.close(key)}
        >
          {message}
        </Button>
      </div>
    ) : undefined;
    antdNotification.open({
      message: description,
      description: '',
      placement: 'top',
      duration: 3,
      className: 'notification tex-center notice-error',
      icon: null,
      btn,
      style: {
        width: 351,
        boxShadow: 'unset',
      },
      key,
      closeIcon: <div />,
    });
  },
  warning: ({ message, description }: NotificationProps) => {
    antdNotification.warning({
      message,
      description,
      className: 'notification',
      icon: null,
      closeIcon: <div />,
    });
  },
  success: ({ message, description }: NotificationProps) => {
    antdNotification.open({
      message,
      description,
      duration: 3,
      placement: 'top',
      className: 'notification notice-success tex-center',
      style: {
        width: 351,
        boxShadow: 'unset',
      },
      icon: null,
      closeIcon: <div />,
    });
  },
};

const days = [
  'on_sunday',
  'on_monday',
  'on_tuesday',
  'on_wednesday',
  'on_thursday',
  'on_friday',
  'on_saturday',
];

export const getPublicDays = (data: Record<string, unknown>) => {
  const result = Object.keys(data)
    .filter(item => days.includes(item) && get(data, item))
    .map((item: string) => days.findIndex(day => day === item));

  return result;
};
