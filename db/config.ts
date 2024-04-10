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
        str: column.number({ default: 10 }),
        int: column.number({ default: 10 }),
        wis: column.number({ default: 10 }),
        cha: column.number({ default: 10 }),
        dex: column.number({ default: 10 }),
        con: column.number({ default: 10 }),
        lvl: column.number({ default: 1 }),
        currentHp: column.number(),
        maxHp: column.number(),
        race: column.text(),
        class: column.text(),
        ac: column.number(),
        diety: column.text({ optional: true }),
        alignment: column.text({ optional: true }),
        gender: column.text({ optional: true }),
    },
});

const CharacterSkill = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        characterId: column.text({
            references: () => Character.columns.id,
        }),
        skillName: column.text({
            references: () => Skill.columns.name,
        }),
        proficiency: column.boolean({ default: false }),
        adv: column.boolean({ default: false }),
    },
});

const Skill = defineTable({
    columns: {
        name: column.text({ primaryKey: true }),
        ability: column.text({
            references: () => Ability.columns.name,
        }),
    },
});

const Ability = defineTable({
    columns: {
        name: column.text({ primaryKey: true }),
    },
});

const CharacterSave = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        characterId: column.text({
            references: () => Character.columns.id,
        }),
        ability: column.text({
            references: () => Ability.columns.name,
        }),
        proficiency: column.boolean({ default: false }),
        adv: column.boolean({ default: false }),
    },
});

// https://astro.build/db/config
export default defineDb({
    tables: {
        User,
        Session,
        Character,
        Skill,
        CharacterSkill,
        CharacterSave,
        Ability,
    },
});
