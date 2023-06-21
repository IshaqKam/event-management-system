import { memo } from 'react';

type TButton = {
  text?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: JSX.Element | string;
  type?: 'submit' | 'reset' | 'button';
};

const Button = ({
  text,
  onClick,
  children,
  disabled = false,
  className = '',
  type = 'button',
}: TButton) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-primary-1 text-white py-3 rounded-full shadow hover:shadow-xl hover:opacity-90 ${className}`}
    >
      {children} {text}
    </button>
  );
};

export default memo(Button);
