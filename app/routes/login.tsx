import { Button, Card, Input, PasswordInput } from "@mantine/core";
import { eq } from "drizzle-orm";
import { data, Form, redirect, useLoaderData, type ActionFunctionArgs } from "react-router";
import { db, users } from "~/db/db";
import imagen from '~/image/login.png'
import { compararPassword } from "~/utils/password";
import jwt from 'jsonwebtoken'
import {commitSession , getSession} from '~/sessions.server'

type UsuarioLogin = {
    usuario: string,
    password: string
}

export const loader = async ({request} : ActionFunctionArgs) => {
    const session = await getSession(request.headers.get('Cookie'))
    
    if(session.get('userId')){
        return redirect('/')
    }
    return data(
        { error: session.get("error") },
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        }
    )
}

export const action = async ({request} : ActionFunctionArgs) => {
    const session = await getSession(request.headers.get('Cookie'))
    
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as unknown as UsuarioLogin
    
    const usuario = await db.query.users.findFirst({
        where: eq(users.usuario, data.usuario)
    });

    if(usuario){
        if(await compararPassword(data.password, usuario.password)){
            const token = jwt.sign({id: usuario.id}, process.env.TOKEN_SECRET!)
            session.set('userId', usuario.id)
            session.set('token', token)
            return redirect("/", {
                headers: {
                    "Set-Cookie": await commitSession(session),
                },
            });
        }else{
            session.flash("error", "Error de contraseña");
            return redirect("/login", {
                headers: {
                    "Set-Cookie": await commitSession(session),
                },
            });
        }
    }else{
        session.flash("error", "Usuario no encontrado");
        return redirect("/login", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }   
   
}


export default function Login() {
    
    const {error} = useLoaderData<typeof loader>()
    
    return (
        <div className="w-screen h-screen flex  flex-col justify-center items-center bg-amber-200">

            <img src={imagen} alt="" width={240} />

            {
                error ? 
                    <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-5">
                        <div className="flex items-center justify-center w-12 bg-red-500">
                            <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                            </svg>
                        </div>

                        <div className="px-4 py-2 -mx-3">
                            <div className="mx-3">
                                <span className="font-semibold text-red-500 dark:text-red-400">{error}</span>
                            </div>
                        </div>
                    </div>

                    : null
                }

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