const fs = require("fs");
const sql = require("mssql");

//Thay đổi cấu hình kết nối
const config = {
  user: "sa",
  password: "admin",
  server: "localhost",
  database: "test",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function insertProvincialData() {
  try {
    //Thay thế đường dẫn đến file data json
    const jsonData = JSON.parse(
      fs.readFileSync(
        "C:/Users/DELL/Downloads/Danh muc vi tri/tinh2.json",
        "utf8"
      )
    );

    let pool = await sql.connect(config);

    for (const provincial of jsonData.Provincial) {
      await pool
        .request()
        .input("ProvincialCode", sql.VarChar, provincial.ProvincialCode)
        .input("STT", sql.Int, provincial.STT)
        .input("ProvincialName", sql.NVarChar, provincial.ProvincialName)
        .input("NationalityID", sql.Int, provincial.NationalityID)
        .query(`INSERT INTO Provincial 
                    (STT, ProvincialName, NationalityID, ProvincialCode) 
                    VALUES (@STT, @ProvincialName, @NationalityID, @ProvincialCode)`);
    }

    console.log("Chèn dữ liệu thành công!");
  } catch (err) {
    console.error("Lỗi khi chèn dữ liệu:", err);
  } finally {
    sql.close();
  }
}

insertProvincialData();
