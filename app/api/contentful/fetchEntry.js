import client from './client';

export async function getEntryById(entryId) {
    console.log("getEntryById", entryId);
    try {
        const entry = await client.getEntry(entryId);
        console.log("entry", entry);
        return entry;
    } catch(err) {
        console.log("error====");
        console.log(err);
        return null;
    }
}