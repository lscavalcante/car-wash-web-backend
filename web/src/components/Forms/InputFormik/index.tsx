import classNames from "classnames";
import { ErrorMessage, FieldProps, useField } from "formik";

import { InputHTMLAttributes, ReactNode, HTMLAttributes } from "react";

export interface InputFormikProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  leftIcon?: ReactNode,
  rightIcon?: ReactNode,
}

export const InputFormik = ({ leftIcon, rightIcon, label = 'Label', ...props }: InputFormikProps) => {
  const [field, meta] = useField(props);

  const styles = classNames(
    ['w-full h-[50px] px-2 text-white bg-zinc-900 rounded text-sm placeholder:text-zinc-500 outline-none border-2 border-transparent transition duration-500 ease-out focus:border-violet-500',],
    {
      ['pl-[2.65rem]']: leftIcon,
      ['pr-[2.65rem]']: rightIcon,
      ['px-2']: !rightIcon || !leftIcon,
      ['border-red-400']: meta.error && meta.touched
    },
  )

  return <>
    <div className="block">
      <label className={`text-violet-500 w-full`}>
        {label}
        {/* <input className={styles} {...field} {...props} /> */}
        <div className="relative flex-1 text-zinc-500 focus-within:text-purple-600">
          {rightIcon && <div className="absolute right-[16px] top-[50%] translate-y-[-50%] text-lg transition-all">
            {rightIcon}
          </div>}
          <input type="text"
            className={styles} {...field} {...props}
            {...props}
          />
          {leftIcon &&
            <div className="absolute left-[16px] top-[50%] translate-y-[-50%] text-lg transition-all">
              {leftIcon}
            </div>}
        </div>
      </label>
    </div>
    {meta.touched && meta.error ? (
      <div className="text-red-400">{meta.error}</div>
    ) : null}
  </>
};