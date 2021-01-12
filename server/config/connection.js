/* eslint-disable no-console */
const mysql = require('mysql2/promise');

const settings = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'culinary_recipes_portfolio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(settings);

async function select(table, where) {
  console.log(`\n\nSELECT, creating connection to: ${table}`);
  const connection = await pool.getConnection();

  try {
    console.log('SELECT, starting transaction');
    await connection.beginTransaction();

    console.log('SELECT, running query');
    let result = [];
    if (where) {
      const elements = where.reduce((acc, { prop, operator, value }) => ({
        ...acc,
        columns: [...(acc.columns || []), `${prop} ${operator} ? `],
        values: [...(acc.values || []), value]
      }), {});
      const query = `SELECT * from ${table} WHERE ${elements.columns.join(' AND ')}`;

      [result] = await connection.query(query, elements.values);
    } else {
      const query = `SELECT * from ${table}`;

      // const [rows, fields] = await connection.query(query);
      console.log(`SELECT, query: ${query}`);
      [result] = await connection.query(query);
    }

    console.log('SELECT, committing transaction');
    await connection.commit();

    console.log('SELECT, transaction committed');
    return result;
  } catch (error) {
    console.error('SELECT, an error occurred: ', error);
    throw error;
  } finally {
    connection.release();
    console.log('SELECT, transaction released\n\n');
  }
}

async function selectSinge(table, where) {
  console.log(`\n\nSELECT SINGLE, creating connection to: ${table}`);
  const connection = await pool.getConnection();

  try {
    console.log('SELECT SINGLE, starting transaction');
    await connection.beginTransaction();

    console.log('SELECT SINGLE, running query');
    const elements = where.reduce((acc, { prop, operator, value }) => ({
      ...acc,
      columns: [...(acc.columns || []), `${prop} ${operator} ? `],
      values: [...(acc.values || []), value]
    }), {});
    const query = `SELECT * from ${table} WHERE ${elements.columns.join(' AND ')}`;

    // const [rows, fields] = await connection.query(query);
    console.log(`SELECT SINGLE, query: ${query}`);
    const [result] = await connection.query(query, elements.values);

    console.log('SELECT SINGLE, committing transaction');
    await connection.commit();

    console.log('SELECT SINGLE, transaction committed');
    return result;
  } catch (error) {
    console.error('SELECT SINGLE, an error occurred: ', error);
    throw error;
  } finally {
    connection.release();
    console.log('SELECT SINGLE, transaction released\n\n');
  }
}

async function insert(table, value) {
  console.log(`\n\nINSERT, creating connection to: ${table}`);
  const connection = await pool.getConnection();

  try {
    console.log('INSERT, starting transaction');
    await connection.beginTransaction();

    console.log('INSERT, running query');
    const elements = Object.entries(value).reduce((acc, [key, value]) => ({
      ...acc,
      columns: [...(acc.columns || []), key],
      values: [...(acc.values || []), value]
    }), {});

    const query = `INSERT INTO ${table} (${elements.columns.join(', ')}) VALUES (${
      Array(elements.columns.length).fill('?').join(', ')})`;

    console.log(`INSERT, query: ${query}`);
    const [result] = await connection.query(query, elements.values);

    console.log('INSERT, committing transaction');
    await connection.commit();

    console.log('INSERT, transaction committed');
    return { id: result.insertId };
  } catch (error) {
    console.error('INSERT, an error occurred: ', error);
    throw error;
  } finally {
    connection.release();
    console.log('INSERT, transaction released\n\n');
  }
}

async function update(table, value, id) {
  console.log(`\n\nUPDATE, creating connection to: ${table}`);
  const connection = await pool.getConnection();

  try {
    console.log('UPDATE, starting transaction');
    await connection.beginTransaction();

    console.log('UPDATE, running query');
    const elements = Object.entries(value).reduce((acc, [key, value]) => ({
      ...acc,
      columns: [...(acc.columns || []), `${key} = ?`],
      values: [...(acc.values || []), value]
    }), {});
    console.log(elements);
    const query = `UPDATE ${table} SET ${elements.columns.join(', ')} WHERE id = ?`;

    console.log(`UPDATE, query: ${query}`);
    const [result] = await connection.query(query, [...elements.values, id]);

    console.log('UPDATE, committing transaction');
    await connection.commit();

    console.log('UPDATE, transaction committed');
    return { updated: !!result.affectedRows };
  } catch (error) {
    console.error('UPDATE, an error occurred: ', error);
    throw error;
  } finally {
    connection.release();
    console.log('UPDATE, transaction released\n\n');
  }
}

async function remove(table, id) {
  console.log(`\n\nDELETE, creating connection to: ${table}`);
  const connection = await pool.getConnection();

  try {
    console.log('DELETE, starting transaction');
    await connection.beginTransaction();

    console.log('DELETE, running query');
    const query = `DELETE FROM ${table} WHERE id = ?`;

    console.log(`DELETE, query: ${query}`);
    const [result] = await connection.query(query, [id]);

    console.log('DELETE, committing transaction');
    await connection.commit();

    console.log('DELETE, transaction committed');
    return { deleted: !!result.affectedRows };
  } catch (error) {
    console.error('DELETE, an error occurred: ', error);
    throw error;
  } finally {
    connection.release();
    console.log('DELETE, transaction released\n\n');
  }
}

module.exports = { select, selectSinge, insert, update, remove };
