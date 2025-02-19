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

async function insertItemGroups() {
  try {
    //Thay thế đường dẫn đến file data json
    const jsonData = JSON.parse(
      fs.readFileSync(
        "D:/Project Intern/DanhMuc/dm_thuoc/ItemGroups.json",
        "utf8"
      )
    );

    let pool = await sql.connect(config);

    for (const itemGroup of jsonData.ItemGroups) {
      await pool
        .request()
        .input("GroupCode", sql.VarChar, itemGroup.GroupCode)
        .input("GroupName", sql.NVarChar, itemGroup.GroupName)
        // .input("ServiceModuleCode", sql.NVarChar, itemGroup.ServiceModuleCode)
        .input("GroupID_BHYT", sql.Int, itemGroup.GroupID_BHYT)
        .query(`INSERT INTO ItemGroups
                    (GroupName, GroupID_BHYT, GroupCode) 
                    VALUES (@GroupName, @GroupID_BHYT, @GroupCode)`);
    }

    console.log("Chèn dữ liệu thành công!");
  } catch (err) {
    console.error("Lỗi khi chèn dữ liệu:", err);
  } finally {
    sql.close();
  }
}

insertItemGroups();
