"use client";
import React, { useId, useState } from "react";
import { FaEye } from "react-icons/fa";

export interface InputProps {
  value?: string | number;
  placeholder: string;
  defaultValue?: string | number;
  name: string;
  inputType?: string;
  isDisabled?: boolean;
  showPass?: boolean;
  min?: number;
  onChange?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function Input({
  value,
  onChange,
  placeholder,
  defaultValue,
  name,
  min,
  inputType = "text",
  isDisabled,
  ref,
  showPass = false,
  onBlur,
}: InputProps) {
  const id = useId();
  const [isShowPass, setIsShowPass] = useState(showPass);

  return (
    <div className="rounded-md relative flex-auto w-full bg-white">
      {isDisabled ? (
        defaultValue ? (
          <>
            <div className="w-full text-lg px-4 pb-2 pt-6 border leading-none border-gray-300 bg-transparent rounded-md min-h-[3.6rem] cursor-not-allowed">
              {defaultValue}
            </div>
            <label
              className="absolute text-xs text-primary top-1 left-4"
              htmlFor={id}>
              {placeholder}
            </label>
          </>
        ) : (
          <div className="w-full text-lg text-primary px-4 pb-2 pt-6 border leading-none   border-gray-300 bg-transparent rounded-md min-h-[3.6rem] cursor-not-allowed">
            {placeholder}
          </div>
        )
      ) : (
        <>
          <div className="flex items-center relative text-lg px-4 pb-2 pt-6 border leading-none border-gray-300 rounded-md focus-within:border-primary">
            <input
              className="border-none flex-1 w-full bg-transparent peer placeholder:text-transparent focus:ring-0 focus:outline-none select-auto"
              autoComplete="off"
              id={id}
              ref={ref}
              name={name}
              {...(inputType === "number" && typeof min === "number"
                ? { min }
                : {})}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              defaultValue={defaultValue}
              type={
                inputType === "password"
                  ? !isShowPass
                    ? "password"
                    : "text"
                  : inputType
              }
            />
            <label
              className="absolute text-xs text-primary duration-100 transform -translate-y-4 top-5 left-4 origin-[0] peer-focus:text-primary peer-focus:top-5 peer-focus:text-xs peer-focus:-translate-y-4 cursor-text peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-xl peer-placeholder-shown:-translate-y-4 peer-placeholder-shown:top-8"
              htmlFor={id}>
              {placeholder}
            </label>
            {inputType === "password" && (
              <div
                onClick={() => {
                  setIsShowPass(!isShowPass);
                }}
                className="cursor-pointer p-4 absolute right-0 top-1">
                <FaEye />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
