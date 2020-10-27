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

module.exports = { select }