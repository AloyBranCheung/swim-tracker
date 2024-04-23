import React, { HTMLInputTypeAttribute } from "react";

interface InputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string | undefined;
  name: string;
  type: HTMLInputTypeAttribute | undefined;
  label: string;
}

export default function Input({
  onChange,
  value,
  name,
  type,
  label,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-header-font" htmlFor={name}>
        {label} (in meters)
      </label>
      <input
        className="rounded-2xl border-none bg-gray-200 bg-none p-2 shadow-inner outline-none"
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
