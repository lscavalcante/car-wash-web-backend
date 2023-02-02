import clsx from "clsx";
import classNames from 'classnames';
import { InputHTMLAttributes, ReactNode, HTMLAttributes } from "react";


var ButtonColors = {
  'primary': '#01010101',
  'success': '#ffffff',
  'danger': 'danger',
  'warning': 'bg-red-600'
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode,
  rightIcon?: ReactNode,
  errors?: string
}

export default function Input({ leftIcon, rightIcon, className, errors, ...props }: InputProps) {

  const styles = classNames(
    ['w-full h-[50px] text-white bg-zinc-900 rounded text-sm placeholder:text-zinc-500 outline-none border-2 border-transparent transition duration-500 ease-out focus:border-violet-500',],
    {
      ['pl-[2.65rem]']: leftIcon,
      ['pr-[2.65rem]']: rightIcon,
      ['px-2']: !rightIcon || !leftIcon,
      ['border-red-400']: errors
    },
  )
  return (
    <div className="block">
      <div className="flex items-center">
        <div className="relative flex-1 text-zinc-500 focus-within:text-purple-600">
          {rightIcon && <div className="absolute right-[16px] top-[50%] translate-y-[-50%] text-lg transition-all">
            {rightIcon}
          </div>}
          <input type="text"
            className={styles}
            {...props}
          />
          {leftIcon && <div className="absolute left-[16px] top-[50%] translate-y-[-50%] text-lg transition-all">
            {leftIcon}
          </div>}
        </div>
      </div>
      <span className="text-red-400 text-sm">{errors}</span>
    </div>
  )
}