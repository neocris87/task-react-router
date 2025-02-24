import { Button, Card, Input, PasswordInput } from "@mantine/core"
import { eq } from "drizzle-orm";
import { Form, Link, redirect, useLoaderData, useParams, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router"
import { db, users } from "~/db/db";
import { encriptarPassword } from "~/utils/password";
import type { Route } from "./+types/editar";


export function meta({}: Route.MetaArgs) {
    return [
      { title: "Editar Usuario" },
      { name: "description", content: "Welcome to React Router!" },
    ];
  }

export async function loader({ params  }: LoaderFunctionArgs) {
    const usuario = await db.query.users.findFirst({
        where: eq(users.id, parseInt(params.id!))
    });
    return { usuario }
}

export const action = async ({request} : ActionFunctionArgs) => {
    
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as unknown as typeof users.$inferSelect;
    if(data.password !== "" && data.password !== undefined && data.password.length > 4) {
        data.password = await encriptarPassword(data.password);
        await db.update(users).set({
            nombre : data.nombre,
            usuario : data.usuario,
            password : data.password
        })
        .where(eq(users.id, data.id));
    }

    await db.update(users)
    .set({
        nombre : data.nombre,
        usuario : data.usuario
    })
    .where(eq(users.id, data.id));

    return redirect("/usuarios");
}


export default function Editar() {

    const { usuario } = useLoaderData<typeof loader>()

    return (
        <div className="max-w-7xl mx-auto mt-5 px-2">

            <div className="flex flex-row justify-between items-center">
                <h1 className="text-2xl font-bold">Editar Usuario {usuario?.id}</h1>
                <Link to="/usuarios">
                    <Button color="gray">Volver</Button>
                </Link>
            </div>

            <div className="max-w-4xl mx-auto mt-5">
                <Card withBorder shadow="sm" radius="md" p="lg" >

                    <Form method="post" className="space-y-4">

                        <Input.Wrapper label="ID" error="" className="hidden">
                            <Input placeholder="Ingresa el nombre" name="id" defaultValue={usuario?.id} />
                        </Input.Wrapper>

                        <Input.Wrapper label="Nombre" error="">
                            <Input placeholder="Ingresa el nombre" name="nombre" defaultValue={usuario?.nombre} />
                        </Input.Wrapper>

                        <Input.Wrapper label="Usuario" error="">
                            <Input placeholder="Ingresa el usuario" name="usuario" defaultValue={usuario?.usuario} />
                        </Input.Wrapper>

                        <PasswordInput name="password" label="Contraseña" placeholder="Dejar en blanco para no cambiar la contraseña" autoComplete="off"  />

                        <div className="flex flex-row justify-end">
                            <Button type="submit" color="violet">Editar Usuario</Button>
                        </div>
                    </Form>

                </Card>
            </div>
        </div>
    )

}