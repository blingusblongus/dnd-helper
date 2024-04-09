import type { APIContext, APIRoute } from "astro";
import { Character, db, eq } from "astro:db";

// export default async function GET(context: APIContext): Promise<Response> {
//     const user = context.locals.user;
//     return new Response(JSON.stringify(user));
// }

export const GET: APIRoute = async ({ locals, redirect }) => {
    const user = locals.user;
    if (!user) {
        return redirect("/login");
    }

    const characters = await db
        .select()
        .from(Character)
        .where(eq(Character.userId, user.id));
    console.log(characters);
    return new Response(JSON.stringify(characters));
};
