import { Button, Card, Input, PasswordInput } from "@mantine/core";
import { Form, Link, redirect, type ActionFunctionArgs } from "react-router";
import { db , users } from "~/db/db";
import { encriptarPassword } from "~/utils/password";



export const action = async ({request} : ActionFunctionArgs) => {
    
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as unknown as typeof users.$inferInsert;
    data.password = await encriptarPassword(data.password);
    const result = await db.insert(users).values(data);
    return redirect("/usuarios");
}


export default function UsuariosCrear() {
    return (
        <div className="max-w-7xl mx-auto mt-5">
            
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-2xl font-bold">Crear Usuario</h1>
                <Link to="/usuarios">
                    <Button color="gray">Volver</Button>
                </Link>
            </div>

            <div className="max-w-4xl mx-auto mt-5">
                <Card withBorder shadow="sm" radius="md" p="lg" >

                    <Form method="post" className="space-y-4">
                        <Input.Wrapper label="Nombre" error="">
                            <Input placeholder="Ingresa el nombre" name="nombre" />
                        </Input.Wrapper>

                        <Input.Wrapper label="Usuario" error="">
                            <Input placeholder="Ingresa el usuario" name="usuario" />
                        </Input.Wrapper>

                        <PasswordInput name="password"  label="Contraseña"  placeholder="Ingreasa la contraseña" />

                        <div className="flex flex-row justify-end">
                            <Button type="submit" color="green">Crear Usuario</Button>
                        </div>
                    </Form>

                </Card>
            </div>
        </div>
    )
}