import classNames from "classnames"
import { SelectHTMLAttributes } from "react";
import { ErrorMessage, FieldProps, useField } from "formik";

interface SelectFormikProps<T> extends SelectHTMLAttributes<HTMLSelectElement> {
  options: T[];
  getValue?: (item: T, selectedIndex: number) => any;
  getName?: (item: T) => string;
  name: string
  errors?: string
  label?: string
  optionDefault?: string | number | undefined
}

export default function SelectFormik<T>({ label, optionDefault, errors, options, getValue, getName, placeholder = "Select...", ...props }: SelectFormikProps<T>) {
  const [field, meta] = useField(props);

  const styles = classNames(
    ['w-full h-[50px] text-white bg-zinc-900 rounded text-sm placeholder:text-zinc-500 outline-none border-2 border-transparent transition duration-500 ease-out focus:border-violet-500',],
    {
      ['border-red-400']: meta.error && meta.touched
    },
  )

  function handleGetName(item: T) {
    return getName!(item);

  }

  return <div>
    <label className={'text-violet-500'}>
      {label}
    </label>
    <select
      {...props}
      {...field}
      className={styles}
    >
      <option value={optionDefault}>{placeholder}</option>
      {options.map((item, index) => {
        return <option
          key={index}
          value={getValue!(item, index)}>{handleGetName(item)}
        </option>
      })}
    </select>
    {meta.touched && meta.error ? (
      <div className="text-red-400">{meta.error}</div>
    ) : null}
  </div>
}