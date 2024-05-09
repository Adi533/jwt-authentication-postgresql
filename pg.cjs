const { Client } =require('pg');
const dotenv =require("dotenv");
dotenv.config();


// createing the client
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database:process.env.DB_NAME,
  password:process.env.DB_PASSWORD,
  port: process.env.DB_PORT, 
});

// connecting the client
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err));

// creating the table if table does not exist
async function createTable() {
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        name VARCHAR(250) NOT NULL,
        password VARCHAR(250) NOT NULL,
        email VARCHAR(250) NOT NULL UNIQUE PRIMARY KEY
      )
    `;
    await client.query(createTableQuery);
    console.log('Table created successfully');
  } catch (err) {
    console.error('Error creating table', err);
  }
}
createTable();

module.exports= {client};