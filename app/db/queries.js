import pool from './connect';

export async function getPosts() {
    console.log("getPosts");
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM users');
    console.log("rows", rows);
    return rows;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  } finally {
    client.release();
  }
} 