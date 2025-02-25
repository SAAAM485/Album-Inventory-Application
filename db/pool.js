require("dotenv").config();
const { Pool } = require("pg"); // 確保這裡使用的是 "pg" 模組

module.exports = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
    ssl: {
        rejectUnauthorized: true,
        ca: process.env.sslrootcert, // 使用 .env 文件中的 SSL 憑證
    },
    sslmode: process.env.sslmode, // 明確使用 .env 文件中的 sslmode 參數
});
