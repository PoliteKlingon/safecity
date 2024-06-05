import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
};

const FormText = ({ name, label, placeholder, type }: Props) => {
  const methods = useFormContext();
  return (
    <>
      {label && <label>{label}</label>}
      <input
        type={type ?? "text"}
        {...methods.register(name)}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
      />
      <ErrorMessage
        errors={methods.formState.errors}
        name={name}
        render={({ message }) => <p className="text-red-600">{message}</p>}
      />
    </>
  );
};

export default FormText;
