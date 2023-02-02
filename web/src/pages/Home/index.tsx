import { Car, Envelope, Eye, EyeSlash, Folders, Lock, Package, UserList, UsersThree } from "phosphor-react";
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import CardMenu from "../../components/CardMenu";
import { useAuth } from "../../hooks/auth";

export default function HomePage() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  function toogleCard(path: string) {
    navigate(path);
  }


  const menus = [
    // { title: 'Clients', icon: <UserList size={65} className={'bg-nuPurple'} weight="duotone" />, routePath: 'clients' },
    { title: 'Users', icon: <UsersThree size={65} className={'bg-nuPurple'} weight="duotone" />, routePath: '/users' },
    { title: 'Vehicles', icon: <Car size={65} className={'bg-nuPurple'} weight="duotone" />, routePath: '/vehicles' },
    { title: 'Categories', icon: <Folders size={65} className={'bg-nuPurple'} weight="duotone" />, routePath: '/categories' },
    { title: 'Services', icon: <Package size={65} className={'bg-nuPurple'} weight="duotone" />, routePath: '/services' },
  ]

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-white text-center text-6xl py-3">Car Wash</h1>
        <div className="grid grid-cols-3 gap-4 max-md:mx-6">
          {menus.map((value, index) => {
            return <div key={index} className="max-md:col-span-3">
              <CardMenu
                title={value.title}
                icon={value.icon}
                onClick={() => { toogleCard(value.routePath) }}
              />
            </div>
          })}
        </div>
        <div className="py-3">
          <Button onClick={signOut}>Deslogar</Button>
        </div>
      </div>
      {/* <div className="h-64 grid grid-rows-3 grid-flow-col gap-4">
        <div>1</div>
        <div>2</div>
        <div>9</div>
        <div>9</div>
        <div>9</div>
        <div>9</div>
        <div>9</div>
      </div> */}
    </>
  )
}