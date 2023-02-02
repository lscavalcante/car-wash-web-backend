import classNames from "classnames"
import { SelectHTMLAttributes } from "react";

interface SelectCustomProps<T> extends SelectHTMLAttributes<HTMLSelectElement> {
  options: T[];
  getValue?: (item: T, selectedIndex: number) => any;
  getName?: (item: T) => string;
  errors?: string
  label?: string
  optionDefault?: string | number
}

export default function SelectCustom<T>({ optionDefault, errors, options, getValue, getName, placeholder = "Select...", ...props }: SelectCustomProps<T>) {

  const styles = classNames(
    ['w-full h-[50px] text-white bg-zinc-900 rounded text-sm placeholder:text-zinc-500 outline-none border-2 border-transparent transition duration-500 ease-out focus:border-violet-500',],
    {
      ['border-red-400']: errors
    },
  )

  function handleGetName(item: T) {
    return getName!(item);

  }

  return <div>
    <select
      {...props}
      className={styles}
    >
      <option disabled value={optionDefault}>{placeholder}</option>
      {options.map((item, index) => {
        return <option
          key={index}
          value={getValue!(item, index)}>{handleGetName(item)}
        </option>
      })}
    </select>
    <span className="text-red-400 text-sm">{errors}</span>
  </div>
}