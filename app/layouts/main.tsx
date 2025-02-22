import { Button } from "@mantine/core";
import { Link } from "react-router";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <>
      <div className="bg-slate-200 shadow px-5 py-2">
        <div className="flex flex-row items-center gap-4    max-w-7xl mx-auto">
          <Link to="/">
            <Button variant="outline" color="blue">Home</Button>
          </Link>
          <Link to="/usuarios">
            <Button variant="outline" color="blue">Usuarios</Button>
          </Link>
          <Link to="/tareas">
            <Button variant="outline" color="blue">Tareas</Button>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  )
}