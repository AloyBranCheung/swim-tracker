import React from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface TextareaProps {
  label: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  className?: ClassNameValue
  labelClassName?: ClassNameValue
}

export default function Textarea({ name, label, className, labelClassName, onChange, value }: TextareaProps) {
  return (
    <div className="relative">
      <textarea onChange={onChange} value={value} name={name} id='textarea' placeholder={label} className={twMerge("transition-all duration-300 bg-none placeholder-transparent rounded-2xl min-h-24 w-full p-2 pt-7 px-3 resize-none outline-none border-none shadow-inner bg-gray-200 bg-opacity-35 text-white peer", className)} />
      <label className={twMerge("transition-all absolute left-3 top-2 z-10 text-sm font-bold text-gray-600 text-opacity-35 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:left-3 peer-focus:text-sm", labelClassName)} htmlFor="textarea">{label}</label>
    </div>
  );
}


