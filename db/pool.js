require("dotenv").config();
const { Pool } = require("db");

module.exports = new Pool({
    connectionString: process.env.DATABASE_URL,
});
