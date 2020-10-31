const mysql = require('mysql2/promise');

var settings = {
  host: "localhost",
  user: "root",
  password: "",
  database: 'culinary_recipes_portfolio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

const pool = mysql.createPool(settings);

async function select(table) {
  console.log("\n\nSELECT, creating connection");
  const connection = await pool.getConnection();

  try {
    console.log("SELECT, starting transaction");
    await connection.beginTransaction();

    console.log("SELECT, running query");
    const query = `SELECT * from ${table}`;
    
    // const [rows, fileds] = await connection.query(query);
    const [result] = await connection.query(query);

    console.log("SELECT, committing transaction");
    await connection.commit();
    
    console.log("SELECT, transaction committed");
    return result;
  } catch (error) {
    console.error("SELECT, an error occurred: ", error);
    throw error;
  } finally {
    connection.release();
    console.log("SELECT, transaction released\n\n");
  }
}

async function selectSinge(table, where) {
  console.log("\n\nSELECT SINGLE, creating connection");
  const connection = await pool.getConnection();

  try {
    console.log("SELECT SINGLE, starting transaction");
    await connection.beginTransaction();

    console.log("SELECT SINGLE, running query");
    const elements = where.reduce((acc, { prop, operator, value}) => ({
      ...acc, 
      collumns: [...(acc.collumns || []), `${prop} ${operator} ? `], 
      values: [...(acc.values || []), value],
    }), {});
    const query = `SELECT * from ${table} WHERE ${elements.collumns.join(' AND ')}`;
    
    // const [rows, fileds] = await connection.query(query);
    const [result] = await connection.query(query, elements.values);

    console.log("SELECT SINGLE, committing transaction");
    await connection.commit();
    
    console.log("SELECT SINGLE, transaction committed");
    return result;
  } catch (error) {
    console.error("SELECT SINGLE, an error occurred: ", error);
    throw error;
  } finally {
    connection.release();
    console.log("SELECT SINGLE, transaction released\n\n");
  }
}

async function insert(table, value) {
  console.log("\n\INSERT, creating connection");
  const connection = await pool.getConnection();

  try {
    console.log("INSERT, starting transaction");
    await connection.beginTransaction();

    console.log("INSERT, running query");
    const elements = Object.entries(value).reduce((acc, [key, value]) => ({
      ...acc, 
      collumns: [...(acc.collumns || []), key], 
      values: [...(acc.values || []), value],
    }), {});

    const query = `INSERT INTO ${table} (${elements.collumns.join(', ')}) VALUES (${
      Array(elements.collumns.length).fill('?').join(', ')})`;

    const [result] = await connection.query(query, elements.values);

    console.log("INSERT, committing transaction");
    await connection.commit();
    
    console.log("INSERT, transaction committed");
    return result;
  } catch (error) {
    console.error("INSERT, an error occurred: ", error);
    throw error;
  } finally {
    connection.release();
    console.log("INSERT, transaction released\n\n");
  }
}

async function update(table, value, id) {
  console.log("\n\UPDATE, creating connection");
  const connection = await pool.getConnection();

  try {
    console.log("UPDATE, starting transaction");
    await connection.beginTransaction();

    console.log("UPDATE, running query");
    const elements = Object.entries(value).reduce((acc, [key, value]) => ({
      ...acc, 
      collumns: [...(acc.collumns || []), `${key} = ?`], 
      values: [...(acc.values || []), value],
    }), {});

    const query = `UPDATE ${table} SET ${elements.collumns.join(', ')} WHERE id = ?`;

    const [result] = await connection.query(query, [...elements.values, id]);

    console.log("UPDATE, committing transaction");
    await connection.commit();
    
    console.log("UPDATE, transaction committed");
    return result;
  } catch (error) {
    console.error("UPDATE, an error occurred: ", error);
    throw error;
  } finally {
    connection.release();
    console.log("UPDATE, transaction released\n\n");
  }
}

async function remove(table, id) {
  console.log("\n\DELETE, creating connection");
  const connection = await pool.getConnection();

  try {
    console.log("DELETE, starting transaction");
    await connection.beginTransaction();

    console.log("DELETE, running query");
    const query = `DELETE FROM ${table} WHERE id = ?`;

    const [result] = await connection.query(query, [id]);

    console.log("DELETE, committing transaction");
    await connection.commit();
    
    console.log("DELETE, transaction committed");
    return result;
  } catch (error) {
    console.error("DELETE, an error occurred: ", error);
    throw error;
  } finally {
    connection.release();
    console.log("DELETE, transaction released\n\n");
  }
}


module.exports = { select, selectSinge, insert, update, remove }