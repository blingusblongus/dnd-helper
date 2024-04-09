import type { APIContext } from "astro";
import { User, db, eq } from "astro:db";
import { Argon2id } from "oslo/password";
import { lucia } from "../../auth";

export async function POST(context: APIContext): Promise<Response> {
    const formData = await context.request.formData();
    const username = formData.get("username");

    console.log(username);

    if (
        typeof username !== "string" ||
        username.length < 3 ||
        username.length > 31 ||
        !/^[a-z0-9_-]+$/.test(username)
    ) {
        return new Response("Invalid username", {
            status: 400,
        });
    }

    const password = formData.get("password");
    if (
        typeof password !== "string" ||
        password.length < 6 ||
        password.length > 255
    ) {
        return new Response("Invalid password", {
            status: 400,
        });
    }

    console.log(username, password);

    const existingUser = await db
        .select()
        .from(User)
        .where(eq(User.username, username.toLowerCase()))
        .get();

    if (!existingUser) {
        return new Response("Incorrect username or password", {
            status: 400,
        });
    }

    const validPassword = await new Argon2id().verify(
        existingUser.hashed_password,
        password,
    );
    if (!validPassword) {
        return new Response("Incorrect username or password", {
            status: 400,
        });
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );

    return context.redirect("/");
}
