import { mysqlTable, primaryKey, int, varchar, text, mysqlEnum, timestamp } from "drizzle-orm/mysql-core"
import { relations } from "drizzle-orm/relations";

const timestamps = {
	updated_at: timestamp(),
	created_at: timestamp().defaultNow().notNull(),
  }

export const tareas = mysqlTable("tareas", {
	id: int().autoincrement().notNull(),
	tarea: varchar({ length: 255 }).notNull(),
	obs: text(),
	estado: mysqlEnum(['Pendiente','Ejecutada']).default('Pendiente').notNull(),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	...timestamps,
},
(table) => [
	primaryKey({ columns: [table.id], name: "tareas_id"}),
]);

export const users = mysqlTable("users", {
	id: int().autoincrement().notNull(),
	nombre: varchar({ length: 50 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	usuario: varchar({ length: 50 }).notNull(),
	...timestamps,
},
(table) => [
	primaryKey({ columns: [table.id], name: "users_id"}),
]);

export const tareasRelations = relations(tareas, ({one}) => ({
	user: one(users, {
		fields: [tareas.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	tareas: many(tareas),
}));
