import pool from './connect';

export async function validateUser(username, password) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`SELECT * FROM users WHERE name = $1 AND password = $2`, [username, password]);
    return rows;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function getUserById(id) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return rows;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  } finally {
    client.release();
  }
}