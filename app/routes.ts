import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/main.tsx" , [
        index("routes/home.tsx"),
        route("usuarios", "routes/usuarios/index.tsx"),
        route("usuarios/crear", "routes/usuarios/crear.tsx"),
        route("usuarios/:id/editar", "routes/usuarios/editar.tsx"),
        route("tareas", "routes/tareas/index.tsx"),  
    ]),
    route("login", "routes/login.tsx"),
] satisfies RouteConfig;
