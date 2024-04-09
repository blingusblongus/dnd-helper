import { db, User } from "astro:db";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";

// https://astro.build/db/seed
export default async function seed() {
    // Seed local test user
    const username = "testuser";
    const password = "testpassword";
    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(password);

    await db
        .insert(User)
        .values([
            { id: userId, username: username, hashed_password: hashedPassword },
        ]);
}
