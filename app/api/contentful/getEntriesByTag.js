import client from "./client";

export async function getEntriesByTag(tagId) {
    console.log(tagId);
    try {
        const entries = await client.getEntries({
            'metadata.tags.sys.id[in]': tagId,
        });
        console.log("entries", entries);
        return entries.items;
    } catch (error) {
        console.error('Error fetching entries by tag:', error);
        throw error;
    }
};

export default getEntriesByTag;