import { UserList } from "phosphor-react";
import { ReactNode } from "react";

interface CardMenuProps {
  title: string,
  icon: ReactNode,
  onClick?: () => void
}

export default function CardMenu(props: CardMenuProps) {
  return (
    <div onClick={props.onClick} className="text-white bg-nuPurple flex items-center justify-center flex-col hover:opacity-80 cursor-pointer duration-300 py-10 rounded-xl">
      {props.icon}
      <h1 className="text-2xl">{props.title}</h1>
    </div>
  )
}