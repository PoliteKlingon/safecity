import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type Props = {
  name: string;
  label: string;
  className?: string;
};

const FormBoolean = ({ name, label, className }: Props) => {
  const methods = useFormContext();
  return (
    <div className={`flex flex-row items-center ${className ?? ""}`}>
      <input
        type="checkbox"
        {...methods.register(name)}
        className={`checkbox-primary checkbox`}
      />
      <label className="text-md pl-4">{label}</label>
      <ErrorMessage
        errors={methods.formState.errors}
        name={name}
        render={({ message }) => <p className="text-red-600">{message}</p>}
      />
    </div>
  );
};

export default FormBoolean;
