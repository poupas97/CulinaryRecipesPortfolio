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

async function select(query) {
  console.log("\n\nSELECT, creating connection...");
  const connection = await pool.getConnection();

  try {
    console.log("SELECT, starting transaction...");
    await connection.beginTransaction();

    console.log("SELECT, running query...");
    // const [rows, fileds] = await connection.query(query);
    const [rows] = await connection.query(query);

    console.log("SELECT, committing transaction...");
    await connection.commit();
    
    console.log("SELECT, transaction committed.");
    return rows;
  } catch (error) {
    console.error("SELECT, an error occurred:", error);
    throw error;
  } finally {
    connection.release();
    console.log("SELECT, transaction released.\n\n");
  }
}

async function insert(query, values) {
  console.log("\n\INSERT, creating connection...");
  const connection = await pool.getConnection();

  try {
    console.log("INSERT, starting transaction...");
    await connection.beginTransaction();

    console.log("INSERT, running query...");
    const [result] = await connection.query(query, values);

    console.log("INSERT, committing transaction...");
    await connection.commit();
    
    console.log("INSERT, transaction committed.");
    return result;
  } catch (error) {
    console.error("INSERT, an error occurred:", error);
    throw error;
  } finally {
    connection.release();
    console.log("INSERT, transaction released.\n\n");
  }
}

async function update(query, values) {
  console.log("\n\UPDATE, creating connection...");
  const connection = await pool.getConnection();

  try {
    console.log("UPDATE, starting transaction...");
    await connection.beginTransaction();

    console.log("UPDATE, running query...");
    const [result] = await connection.query(query, values);

    console.log("UPDATE, committing transaction...");
    await connection.commit();
    
    console.log("UPDATE, transaction committed.");
    return result;
  } catch (error) {
    console.error("UPDATE, an error occurred:", error);
    throw error;
  } finally {
    connection.release();
    console.log("UPDATE, transaction released.\n\n");
  }
}

async function remove(query, values) {
  console.log("\n\DELETE, creating connection...");
  const connection = await pool.getConnection();

  try {
    console.log("DELETE, starting transaction...");
    await connection.beginTransaction();

    console.log("DELETE, running query...");
    const [result] = await connection.query(query, values);

    console.log("DELETE, committing transaction...");
    await connection.commit();
    
    console.log("DELETE, transaction committed.");
    return result;
  } catch (error) {
    console.error("DELETE, an error occurred:", error);
    throw error;
  } finally {
    connection.release();
    console.log("DELETE, transaction released.\n\n");
  }
}


module.exports = { select, insert, update, remove }