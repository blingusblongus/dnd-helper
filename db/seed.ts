import {
    Ability,
    Character,
    CharacterSave,
    CharacterSkill,
    db,
    Skill,
    User,
} from "astro:db";
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

    const characterId = generateId(15);
    await db.insert(Character).values([
        // {
        //     id: characterId,
        //     userId: userId,
        //     name: "Joel Mistletoe",
        //     str: 10,
        //     wis: 10,
        //     int: 10,
        //     dex: 10,
        //     cha: 10,
        //     con: 10,
        //     lvl: 1,
        //     currentHp: 10,
        //     maxHp: 10,
        //     race: "Human",
        //     class: "Bard",
        //     ac: 10,
        // },
        {
            id: characterId,
            lvl: 10,
            userId,
            name: "Traxif Twinmantle",
            race: "Gnome",
            class: "Gadgeteer",
            gender: "Male",
            alignment: "Chaotic Good",
            currentHp: 41,
            maxHp: 64,
            ac: 12,
            diety: null,
            str: 10,
            dex: 13,
            con: 14,
            int: 20,
            wis: 13,
            cha: 14,
        },
    ]);

    await db
        .insert(Ability)
        .values([
            { name: "str" },
            { name: "dex" },
            { name: "con" },
            { name: "int" },
            { name: "wis" },
            { name: "cha" },
        ]);

    await db.insert(Skill).values([
        { ability: "dex", name: "Acrobatics" },
        { ability: "wis", name: "Animal Handling" },
        { ability: "int", name: "Arcana" },
        { ability: "str", name: "Athletics" },
        { ability: "cha", name: "Deception" },
        { ability: "int", name: "History" },
        { ability: "wis", name: "Insight" },
        { ability: "cha", name: "Intimidation" },
        { ability: "int", name: "Investigation" },
        { ability: "wis", name: "Medicine" },
        { ability: "int", name: "Nature" },
        { ability: "wis", name: "Perception" },
        { ability: "cha", name: "Performance" },
        { ability: "cha", name: "Persuasion" },
        { ability: "int", name: "Religion" },
        { ability: "dex", name: "Sleight of Hand" },
        { ability: "dex", name: "Stealth" },
        { ability: "wis", name: "Survival" },
        { ability: "int", name: "Technology" },
        { ability: "int", name: "Data" },
    ]);

    await db.insert(CharacterSkill).values([
        { characterId, skillName: "Acrobatics" },
        { characterId, skillName: "Animal Handling" },
        { characterId, skillName: "Arcana" },
        { characterId, skillName: "Athletics" },
        { characterId, skillName: "Deception" },
        { characterId, skillName: "History" },
        { characterId, skillName: "Insight" },
        { characterId, skillName: "Intimidation" },
        { characterId, skillName: "Investigation", proficiency: true },
        { characterId, skillName: "Medicine" },
        { characterId, skillName: "Nature" },
        { characterId, skillName: "Perception" },
        { characterId, skillName: "Performance" },
        { characterId, skillName: "Persuasion" },
        { characterId, skillName: "Religion" },
        { characterId, skillName: "Sleight of Hand" },
        { characterId, skillName: "Stealth" },
        { characterId, skillName: "Survival" },
        { characterId, skillName: "Technology", proficiency: true },
        { characterId, skillName: "Data", proficiency: true },
    ]);

    await db.insert(CharacterSave).values([
        { characterId, ability: "str" },
        { characterId, ability: "dex", proficiency: true },
        { characterId, ability: "con" },
        { characterId, ability: "int", proficiency: true },
        { characterId, ability: "wis" },
        { characterId, ability: "cha" },
    ]);
}
