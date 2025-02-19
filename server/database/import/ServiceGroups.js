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
async function insertServiceGroup() {
  try {
    const jsonData = JSON.parse(
      fs.readFileSync(
        "D:/Project Intern/DanhMuc/dm_dichvu/DichVuGroup.json",
        "utf8"
      )
    );

    let pool = await sql.connect(config);

    for (const service of jsonData.ServiceGroups) {
      await pool
        .request()
        .input("STT", sql.Int, service.STT)
        .input("RowID", sql.Int, service.RowID)
        .input("ServiceGroupCode", sql.NVarChar, service.ServiceGroupCode)
        .input("ServiceGroupName", sql.NVarChar, service.ServiceGroupName)

        .query(`INSERT INTO ServiceGroups 
                    (ServiceGroupName, STT, RowID, ServiceGroupCode) 
                    VALUES (@ServiceGroupName, @STT, @RowID, @ServiceGroupCode)`);
    }

    console.log("Chèn dữ liệu thành công!");
  } catch (err) {
    console.error("Lỗi khi chèn dữ liệu:", err);
  } finally {
    sql.close();
  }
}

insertServiceGroup();
