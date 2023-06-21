import dynamic from 'next/dynamic';

// ///////////////////////////////////////
// components/common
const AppLoader = dynamic(
  async () => {
    const response = await import('./common/AppLoader');
    return response.AppLoader;
  },
  { ssr: false },
);

const Card = dynamic(
  async () => {
    const response = await import('./common/Card');
    return response.Card;
  },
  { ssr: false },
);

const AppModal = dynamic(
  async () => {
    const response = await import('./common/Modal');
    return response.AppModal;
  },
  { ssr: false },
);

const Link = dynamic(async () => import('./common/Link'), { ssr: false });

const Input = dynamic(
  async () => {
    const response = await import('./common/Input');
    return response.Input;
  },
  { ssr: false },
);

const AppButton = dynamic(
  async () => {
    const response = await import('./common/Button');
    return response.AppButton;
  },
  { ssr: false },
);

const Dropdown = dynamic(
  async () => {
    const response = await import('./common/Dropdown');
    return response.Dropdown;
  },
  { ssr: false },
);

const Container = dynamic(
  async () => {
    const response = await import('./common/Container');
    return response.Container;
  },
  { ssr: false },
);

export {
  AppLoader,
  AppButton,
  Container,
  Dropdown,
  AppModal,
  Input,
  Link,
  Card,
};
