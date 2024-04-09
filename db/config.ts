import { defineDb, column, defineTable } from "astro:db";

const User = defineTable({
    columns: {
        id: column.text({
            primaryKey: true,
        }),
        username: column.text({
            unique: true,
        }),
        hashed_password: column.text(),
    },
});

const Session = defineTable({
    columns: {
        id: column.text({
            primaryKey: true,
        }),
        expiresAt: column.date(),
        userId: column.text({
            references: () => User.columns.id,
        }),
    },
});

const Character = defineTable({
    columns: {
        id: column.text({
            primaryKey: true,
        }),
        userId: column.text({
            references: () => User.columns.id,
        }),
        name: column.text(),
        str: column.number(),
        int: column.number(),
        wis: column.number(),
        cha: column.number(),
        dex: column.number(),
        lvl: column.number(),
    },
});

// https://astro.build/db/config
export default defineDb({
    tables: {
        User,
        Session,
        Character,
    },
});
