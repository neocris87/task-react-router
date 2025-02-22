import { Button, Table } from "@mantine/core";
import { desc } from "drizzle-orm";
import { Link, useLoaderData } from "react-router";
import { db, users } from "~/db/db";


export const loader = async () => {
  const data = await db.select().from(users).orderBy(desc(users.created_at)).limit(5);
  return { "users" : data };
}


export default function UsuariosIndex() {

  const { users } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <Link to="/usuarios/crear">
          <Button>Crear</Button>
        </Link>
      </div>

      <div>
        <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Nombre</Table.Th>
            <Table.Th>Usuario</Table.Th>
            <Table.Th>Contraseña</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            users.map((user) => (
              <Table.Tr key={user.id}>
                <Table.Td>{user.id}</Table.Td>
                <Table.Td>{user.nombre}</Table.Td>
                <Table.Td>{user.usuario}</Table.Td>
                <Table.Td>{user.password}</Table.Td>
              </Table.Tr>
            ))
          }
        </Table.Tbody>
      </Table>
      </div>
    </div>
  )
}