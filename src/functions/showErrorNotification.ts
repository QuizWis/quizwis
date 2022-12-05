import { showNotification } from '@mantine/notifications';

const showErrorNotification = (values: { title?: string, error: unknown }) => {
  let message = '不明なエラーが発生しました。';
  if (values.error instanceof Error) {
    message = values.error.message;
  }
  showNotification({
    color: 'red',
    title: values.title || 'エラー',
    message,
  });
};

export default showErrorNotification;
