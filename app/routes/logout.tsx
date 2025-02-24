
import { redirect } from "react-router";
import { destroySession , getSession } from '~/sessions.server'

import type {Route} from "./+types/logout"


export const action = async ({request } : Route.ActionArgs) => {
    const session  = await getSession(request.headers.get('Cookie'))
    console.log("Ruta /logout")
    return redirect("/login", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
    });
}




  