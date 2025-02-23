import bcrypt from "bcryptjs";

export async function encriptarPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}


export async function compararPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
}