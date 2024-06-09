import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  rows?: number;
};

const FormTextArea = ({
  name,
  label,
  placeholder,
  className,
  inputClassName,
  rows,
}: Props) => {
  const methods = useFormContext();
  return (
    <div className={className ?? ""}>
      {label && <label className="text-md pl-4">{label}</label>}
      <textarea
        {...methods.register(name)}
        placeholder={placeholder}
        className={`input input-bordered w-full my-1 ${inputClassName ?? ""}`}
        rows={rows}
      />
      <ErrorMessage
        errors={methods.formState.errors}
        name={name}
        render={({ message }) => <p className="text-red-600">{message}</p>}
      />
    </div>
  );
};

export default FormTextArea;
