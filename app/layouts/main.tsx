import type { Route } from "./+types/main";
import { data,  Form,  NavLink, Outlet, redirect } from "react-router";

import {commitSession , getSession } from '~/sessions.server'

import { Button } from "@mantine/core";
import { ImExit } from "react-icons/im";

import LogoLight from '~/image/logo-light.svg'

const activeCss = "border-b-2 border-blue-500 text-blue-600"
const inactiveCss = "border-transparent text-gray-600 hover:text-blue-500 hover:border-blue-300"

export const loader = async ({request } : Route.LoaderArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  
  if(!session?.get('userId')) {
    return redirect('/login')
  }
  return data({
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function MainLayout() {
  
  
  return (
    <>
      <div className="bg-slate-200 shadow px-5 py-2">
        <div className="flex flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
          
          <div className=" flex fle items-center gap-2">
            <img src={LogoLight}  alt="React Router" width={100} className="block" />
            
            <NavLink to="/" className={({ isActive }) => `px-4 py-2 transition-all border-b-2 ${ isActive ? activeCss : inactiveCss }`} >
              Home
            </NavLink>

            <NavLink 
              to="/usuarios" className={({ isActive }) => `px-4 py-2 transition-all border-b-2 ${ isActive ? activeCss : inactiveCss }`} >
              Usuarios
            </NavLink>

            <NavLink to="/tareas" className={({ isActive }) => `px-4 py-2 transition-all border-b-2 ${ isActive ? activeCss : inactiveCss }`} >
              Tareas
            </NavLink>
          </div>

          <Form method="post" action="/logout">
            <Button type="submit" className="!p-2" color="orange" >
              <ImExit size={18} />
            </Button>
          </Form>

        </div>
      </div>
      
      <Outlet context={{
        "user" : "Cristian Andres Aguire"
      } } />
    </>
  )
}