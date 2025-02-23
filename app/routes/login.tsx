import { Button, Card, Input, PasswordInput } from "@mantine/core";
import { eq } from "drizzle-orm";
import { Form, redirect, type ActionFunctionArgs } from "react-router";
import { db, users } from "~/db/db";
import imagen from '~/image/login.png'
import { compararPassword } from "~/utils/password";
import jwt from 'jsonwebtoken'

type UsuarioLogin = {
    usuario: string,
    password: string
}

export const action = async ({request} : ActionFunctionArgs) => {
    
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as unknown as UsuarioLogin
    
    const usuario = await db.query.users.findFirst({
        where: eq(users.usuario, data.usuario)
    });

    if(usuario){
        if(await compararPassword(data.password, usuario.password)){
            const token = jwt.sign({id: usuario.id}, process.env.TOKEN_SECRET!)
            console.log(token);
        }else{
            console.log('Error de contraseña');
        }
    }else{
        console.log('Usuario no encontrado');
    }   
   
    // return redirect("/usuarios");
    return null;
}


export default function Login() {
    return (
        <div className="w-screen h-screen flex  flex-col justify-center items-center bg-amber-200">

            <img src={imagen} alt="" width={240} />

            <Card withBorder shadow="sm" radius="md" p="lg" className="w-96" >

                <Form method="post" className="space-y-4">

                    <Input.Wrapper label="Usuario" error="">
                        <Input placeholder="Ingresa el usuario" name="usuario" />
                    </Input.Wrapper>

                    <PasswordInput name="password" label="Contraseña" placeholder="Ingreasa la contraseña" />

                    <Button type="submit" fullWidth color="orange">Acceder</Button>

                </Form>

            </Card>
        </div>)
}