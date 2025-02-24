import { Button, Table } from "@mantine/core";
import { desc } from "drizzle-orm";
import { Link, useLoaderData, useOutletContext } from "react-router";
import { db, users } from "~/db/db";
import { FaPencilAlt } from "react-icons/fa";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lista de Usuarios" },
    { name: "description", content: "Listado de Usuarios" },
  ];
}

export const loader = async () => {
  // const data = await db.select().from(users).orderBy(desc(users.created_at)).limit(5);
  
  const data = await db.query.users.findMany({
    with: {
      tareas: true,
    },
    orderBy: desc(users.created_at),
  });
  return { "users": data };
}


export default function UsuariosIndex() {

  const { users } = useLoaderData<typeof loader>();
  const context = useOutletContext();
  console.info(context)
  return (
    <div className="max-w-7xl mx-auto mt-5 px-2">

      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <Link to="/usuarios/crear">
          <Button>Crear</Button>
        </Link>
      </div>

      <div className="mt-5" >
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Nombre</Table.Th>
              <Table.Th>Usuario</Table.Th>
              {/* <Table.Th>Contraseña</Table.Th> */}
              <Table.Th>Tareas</Table.Th>
              <Table.Th className="w-24">Acciones</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {
              users.map((user) => (
                <Table.Tr key={user.id}>
                  <Table.Td>{user.id}</Table.Td>
                  <Table.Td>{user.nombre}</Table.Td>
                  <Table.Td>{user.usuario}</Table.Td>
                  {/* <Table.Td>{user.password}</Table.Td> */}
                  <Table.Td>{user.tareas.length}</Table.Td>
                  <Table.Td>
                    <Link to={`/usuarios/${user.id}/editar`}>
                      <Button color="yellow" className="!p-2" >
                        <FaPencilAlt size={16} />
                      </Button>
                    </Link>
                  </Table.Td>
                </Table.Tr>
              ))
            }
          </Table.Tbody>
        </Table>
      </div>
    </div>
  )
}