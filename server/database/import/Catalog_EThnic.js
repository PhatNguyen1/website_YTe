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

//Thay thế đường dẫn đến file data json
async function insertCatalogEThnicData() {
  try {
    const jsonData = JSON.parse(
      fs.readFileSync(
        "C:/Users/DELL/Downloads/Danh muc vi tri/dontoc.json",
        "utf8"
      )
    );

    let pool = await sql.connect(config);

    for (const ethnic of jsonData.Catalog_EThnic) {
      await pool
        .request()
        .input("EThnicID", sql.Int, ethnic.EThnicID)
        .input("STT", sql.Int, ethnic.STT)
        .input("EThnicName", sql.NVarChar, ethnic.EThnicName)
        .input("NationalityID", sql.Int, ethnic.NationalityID)
        .input("EThnic_Code", sql.VarChar, ethnic.EThnic_Code)
        .query(`INSERT INTO Catalog_EThnic 
                    (EThnicID, STT, EThnicName, NationalityID, EThnic_Code) 
                    VALUES (@EThnicID, @STT, @EThnicName, @NationalityID, @EThnic_Code)`);
    }

    console.log("Chèn dữ liệu thành công!");
  } catch (err) {
    console.error("Lỗi khi chèn dữ liệu:", err);
  } finally {
    sql.close();
  }
}

insertCatalogEThnicData();
