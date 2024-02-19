import { HTMLInputTypeAttribute } from "react";

function Input({
  id,
  type,
  required,
  placeholder,
}: {
  type: HTMLInputTypeAttribute;
  id: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      id={id}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500 mb-2"
      placeholder={placeholder}
      required={required}
    />
  );
}

export default Input;
