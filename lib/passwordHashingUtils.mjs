import bcrypt from "bcryptjs";

async function genPasswordHash(key) {
    try {
        const hashedPassword = await bcrypt.hash(key, 10);
        return hashedPassword;
    } catch(err) {
        console.error(err);
    }
}

export { genPasswordHash }