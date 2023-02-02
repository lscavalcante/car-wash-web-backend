import { ButtonHTMLAttributes } from "react";

interface InputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export default function Button(props: InputProps) {
  return <button
    className="bg-nuPurple text-white rounded text-sm h-12 font-bold enabled:hover:opacity-80 transition-all disabled:bg-gray-400 w-full"
    {...props}>{props.children}
  </button>
}