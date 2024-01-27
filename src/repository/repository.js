const pool = require('../db');

async function createUserDB(username, email, phone, pwd) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const sql = 'INSERT INTO users(username, email, phone, pwd) VALUES($1, $2, $3, $4) RETURNING *';
    const { rows } = await client.query(sql, [username, email, phone, pwd]);

    await client.query('COMMIT');

    return rows;
  } catch (error) {
    await client.query('ROLLBACK');
    return [];
  }
}

async function getAllUsersDB() {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users';
  const { rows } = await client.query(sql);
  return rows;
}

async function getUserByIdDB(id) {
  const client = await pool.connect();
  const sql = 'select * from users where id = $1';
  const { rows } = await client.query(sql, [id]);
  return rows;
}

async function getUserByEmailDB(email) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users WHERE email = $1';
  const { rows } = await client.query(sql, [email]);

  return rows;
}

async function deleteUserByIdDB(id) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const { rows } = await client.query(sql, [id]);

    await client.query('COMMIT');

    return rows;
  } catch (error) {
    await client.query('ROLLBACK');
    return [];
  }
}

async function updateUserPathDB(id, body) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryOldUser = 'select * from users where id = $1';
    const { rows: old } = await client.query(queryOldUser, [id]);
    const pathedUser = { ...old[0], ...body };
    const queryUser = 'update users set username = $1, email = $2, phone = $3, pwd = $4 where id = $5 returning *';
    const { rows: patchedRows } = await client.query(queryUser, [pathedUser.username, pathedUser.email, pathedUser.phone, pathedUser.pwd, id]);
    await client.query('COMMIT');
    return patchedRows;
  } catch (error) {
    await client.query('ROLLBACK');
    return [];
  }
}

async function updateUserByIdDB(id, username, email, phone, pwd) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'UPDATE users SET username = $2, email = $3, phone = $4, pwd = $5 WHERE id = $1 RETURNING *';
    const { rows } = await client.query(sql, [id, username, email, phone, pwd]);
    await client.query('COMMIT');
    return rows;
  } catch (er) {
    await client.query('ROLLBACK');
    return [];
  }
}

module.exports = {
  createUserDB,
  getAllUsersDB,
  getUserByIdDB,
  deleteUserByIdDB,
  updateUserPathDB,
  updateUserByIdDB,
  getUserByEmailDB,
};
