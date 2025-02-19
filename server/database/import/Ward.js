const fs = require('fs');
const sql = require('mssql');


const config = {
    user: 'sa',  
    password: 'admin',  
    server: 'localhost',  
    database: 'medical-management',  
    options: {
        encrypt: true, 
        trustServerCertificate: true 
    }
};


async function insertWardData() {
    try {
        const jsonData = JSON.parse(fs.readFileSync('C:/Users/DELL/Downloads/phuong.json', 'utf8'));

        let pool = await sql.connect(config);


        for (const ward of jsonData.Ward) {
            await pool.request()
                .input('WardCode', sql.NVarChar, ward.WardCode)
                .input('STT', sql.Int, ward.STT)
                .input('WardName', sql.NVarChar, ward.WardName)
                .input('EmployeeCode', sql.NVarChar, ward.EmployeeCode)
                .input('IDate', sql.DateTime, ward.IDate)
                .input('DistrictCode', sql.NVarChar, ward.DistrictCode)
                .input('ShortFor', sql.NVarChar, ward.ShortFor)
                .input('Hide', sql.Bit, ward.Hide)
                .input('WardCode_BHYT', sql.NVarChar, ward.WardCode_BHYT)
                .query(`INSERT INTO Ward 
                    (WardCode, STT, WardName, EmployeeCode, IDate, DistrictCode, ShortFor, Hide, WardCode_BHYT) 
                    VALUES (@WardCode, @STT, @WardName, @EmployeeCode, @IDate, @DistrictCode, @ShortFor, @Hide, @WardCode_BHYT)`);
        }

        console.log('Chèn dữ liệu thành công!');
    } catch (err) {
        console.error('Lỗi khi chèn dữ liệu:', err);
    } finally {

        sql.close();
    }
}


insertWardData();
