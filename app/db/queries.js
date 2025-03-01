import pool from './connect';

export async function getAllItems(tableName) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`SELECT * FROM ${tableName}`);
    return rows;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function getItemsById(tableName, idName, id) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`SELECT * FROM ${tableName} WHERE ${idName} = ${id} `);
    return rows;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  } finally {
    client.release();
  }
} 