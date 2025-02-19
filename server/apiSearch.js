const express = require('express');
const cors = require('cors');
const { conn, sql } = require('./config/config');  // Ensure correct import of conn and sql
const app = express();

app.use(cors());  // Use CORS to allow cross-origin requests

// API to search patient and medical record information
app.get('/search', async (req, res) => {
    try {
        const pool = await conn;  // Connect to the database through conn

        // Create a transaction to ensure consistency in the query
        const transaction = new sql.Transaction(pool);
        await transaction.begin();

        try {
            // Prepare the query with parameter declarations
            const searchQuery = `
              SELECT 
                    p.patient_id, 
                    m.medicalRecord_id, 
                    p.patient_name AS full_name, 
                    m.examination_date, 
                    p.gender, 
                    m.phone_num, 
                    m.object_type, 
                    m.room AS clinic_room,
                    m.career,
                    m.patient_address
                FROM 
                    MedicalRecord m
                INNER JOIN 
                    Patient p ON m.patient_id = p.patient_id
                WHERE 
                    (COALESCE(@dateStart, '') = '' OR m.examination_date >= @dateStart)
                    AND (COALESCE(@dateEnd, '') = '' OR m.examination_date <= @dateEnd)
                    AND (COALESCE(@selectedRoom, '') = '' OR m.room = @selectedRoom)
                    AND (COALESCE(@selectedObject, '') = '' OR m.object_type = @selectedObject);

            `;

            // Create a request and declare parameters
            const request = new sql.Request(transaction);
            request.input('dateStart', sql.DateTime, req.query.dateStart || null);
            request.input('dateEnd', sql.DateTime, req.query.dateEnd || null);
            request.input('selectedRoom', sql.VarChar, req.query.selectedRoom || null);
            request.input('selectedObject', sql.VarChar, req.query.selectedObject || null);

            // Execute the query
            const result = await request.query(searchQuery);

            // Commit the transaction after successful query
            await transaction.commit();

            // Send the result back to the client
            res.json(result.recordset);
        } catch (error) {
            // Rollback the transaction if an error occurs
            await transaction.rollback();
            console.error('Error during query execution:', error);
            res.status(500).send({ error: 'Error during data query.' });
        }

    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).send({ error: 'Database connection error.' });
    }
});

app.get('/clinics', async (req, res) => {
    try {
      const pool = await conn; 
      const result = await pool.request().query('SELECT clinic_id, clinic_name FROM Clinics');
      res.json(result.recordset); // Trả về danh sách phòng khám
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

app.get('/appointment-types', async (req, res) => {
    try {
      const pool = await conn; // Assuming `conn` is your database connection pool
      const result = await pool.request().query('SELECT type_name FROM AppointmentTypes');
      res.json(result.recordset); // Return the list of appointment type names
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
// Start the server
app.listen(9000, () => {
    console.log('Server is running on port 9000');
});
