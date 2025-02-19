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
async function insertServiceCategory() {
  try {
    const jsonData = JSON.parse(
      fs.readFileSync(
        "D:/Project Intern/DanhMuc/dm_dichvu/DichVuCategories.json",
        "utf8"
      )
    );

    let pool = await sql.connect(config);

    for (const service of jsonData.ServiceCategories) {
      await pool
        .request()
        .input("STT", sql.Int, service.STT)
        .input("RowID", sql.Int, service.RowID)
        .input("ServiceGroupCode", sql.NVarChar, service.ServiceGroupCode)
        .input("ServiceCategoryName", sql.NVarChar, service.ServiceCategoryName)
        .input("ServiceCategoryCode", sql.NVarChar, service.ServiceCategoryCode)
        .query(`INSERT INTO ServiceCategories
                    (ServiceCategoryCode, STT, RowID, ServiceGroupCode, ServiceCategoryName) 
                    VALUES (@ServiceCategoryCode, @STT, @RowID, @ServiceGroupCode, @ServiceCategoryName)`);
    }

    console.log("Chèn dữ liệu thành công!");
  } catch (err) {
    console.error("Lỗi khi chèn dữ liệu:", err);
  } finally {
    sql.close();
  }
}

insertServiceCategory();
