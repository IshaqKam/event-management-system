import {
  memo,
  FocusEventHandler,
  ChangeEventHandler,
  HTMLInputTypeAttribute,
} from 'react';

type Props = {
  name: string;
  error?: string;
  label?: string;
  touched: boolean;
  required?: boolean;
  inputClass?: string;
  placeholder?: string;
  value?: string | null;
  containerClass?: string;
  type?: HTMLInputTypeAttribute;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const Input = ({
  name = '',
  value = '',
  label = '',
  error = '',
  type = 'text',
  inputClass = '',
  placeholder = '',
  required = false,
  containerClass = '',
  touched,
  onBlur,
  onChange,
}: Props) => {
  return (
    <span className={containerClass}>
      {label && (
        <label
          htmlFor={`${name}-id`}
          className="block mb-2 text-sm text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={`${name}-id`}
        value={value ?? ''}
        onBlur={onBlur}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`bg-gray-100 border my-3 border-white text-gray-900 text-sm rounded-full focus:ring-primary-1 focus:border-primary-1 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-1 dark:focus:border-primary-1 ${inputClass}`}
      />
      {error && touched && (
        <span className="text-sm text-red-600 ml-2">{error}</span>
      )}
    </span>
  );
};

export default memo(Input);
