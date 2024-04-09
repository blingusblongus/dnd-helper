import type { APIRoute } from "astro";
import { Character, db, eq } from "astro:db";

export const GET: APIRoute = async ({ locals, redirect }) => {
    const user = locals.user;
    if (!user) {
        return redirect("/login");
    }

    const characters = await db
        .select()
        .from(Character)
        .where(eq(Character.userId, user.id));

    if (characters.length === 0) {
        return new Response("No characters found", { status: 204 });
    }
    return new Response(JSON.stringify(characters), { status: 200 });
};
