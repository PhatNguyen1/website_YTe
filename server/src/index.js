const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const handlebars = require("express-handlebars");

const PORT = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());

// const PatientRoutes = require("../routes/PatientRoutes");
const ExaminateRoutes = require("../routes/ExaminateRoutes");
const AssignmentRoutes = require("../routes/AssignmentRoutes");
// const ExaminationPaymentsController = require("../routes/ExaminationPaymentRoutes");
const Appointment = require("../routes/AppointmentRoutes");
const Catalog_EthnicRoutes = require("../routes/Catalog_EthnicRoutes");
const Catalog_nationalityRoutes = require("../routes/Catalog_nationalityRoutes");
const ProvincialRoutes = require("../routes/ProvincialRoutes");
const DistrictRoutes = require("../routes/DistrictRoutes");
const WardRoutes = require("../routes/WardRoutes");
const CareerRoutes = require("../routes/CareerRoutes");
const DeparmentsRoutes = require("../routes/DeparmentsRoutes");
const TechnicalServiceCategoriesRoutes = require("../routes/TechnicalServiceCategoriesRoutes");
// const AssignmentDetailController = require("../routes/AssignmentDetailRoutes");
const ServiceRoute = require("../routes/ServiceRoute");

//HTTP logger
app.use(morgan("combined"));
//Template Engine
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
//path Template Engine
app.set("views", path.join(__dirname, "resources\\views"));
console.log("PATH: ", path.join(__dirname, "resources\\views"));
//Xử lý json
app.use(express.json());

//Route
// app.use("/api", PatientRoutes);
// app.use("/api", ExaminateRoutes);
// app.use("/api", ExaminationPaymentsController);
app.use("/api", Appointment);
app.use("/api", Catalog_nationalityRoutes);
app.use("/api", Catalog_EthnicRoutes);
app.use("/api", ProvincialRoutes);
app.use("/api", DistrictRoutes);
app.use("/api", WardRoutes);
app.use("/api", CareerRoutes);
app.use("/api", DeparmentsRoutes);
app.use("/api", TechnicalServiceCategoriesRoutes);
app.use("/api", AssignmentRoutes);
// app.use("/api", AssignmentDetailController);
app.use("/api", ServiceRoute);

//check port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
