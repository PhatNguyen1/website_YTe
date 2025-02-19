const sql = require("mssql");

const config = {
  user: "truong",
  password: "admin",
  server: "localhost",
  database: "hospital",
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function connectDB() {
  try {
    await sql.connect(config);
    console.log("Kết nối database thành công");
  } catch (err) {
    console.error("Lỗi kết nối database:", err);
  }
}

const poolPromise = sql
  .connect(config)
  .then((pool) => {
    if (pool.connecting) {
      console.log("Connecting to SQL Server...");
    }
    return pool;
  })
  .catch((err) => {
    console.error("SQL Server connection error:", err);
    process.exit(1);
  });

console.log(connectDB());

module.exports = { sql, connectDB, poolPromise };
