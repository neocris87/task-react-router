import { Button, Table } from "@mantine/core";
import { Link } from "react-router";

export default function TareasIndex() {
    return (
        <div className="max-w-7xl mx-auto mt-5">

      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Tareas</h1>
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
              <Table.Th>Tareas</Table.Th>
              <Table.Th className="w-24">Acciones</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            
          </Table.Tbody>
        </Table>
      </div>
    </div>
    )
}