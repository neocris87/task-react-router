import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/main.tsx" , [
        index("routes/home.tsx"),
        route("usuarios", "routes/usuarios/index.tsx"),
        route("usuarios/crear", "routes/usuarios/crear.tsx"),
        route("tareas", "routes/tareas/index.tsx"),
        

    ]),
] satisfies RouteConfig;
