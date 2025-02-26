require("dotenv").config();
const { Client } = require("pg");

async function dropTable() {
    const client = new Client({
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

    try {
        await client.connect();
        console.log("Connected to the database.");

        // 執行 DROP TABLE 命令
        const dropTableQuery = "DROP TABLE IF EXISTS albums;";
        await client.query(dropTableQuery);
        console.log("Table 'albums' dropped successfully.");
    } catch (err) {
        console.error("Error executing DROP TABLE command:", err);
    } finally {
        await client.end();
        console.log("Disconnected from the database.");
    }
}

dropTable();
