const { Appointment } = require("../models");

class AppointmentController {
  static async store(req, res) {
    try {
      const appointment = await Appointment.create(req.body);
      return res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ error: "Không thêm được 'Đặt hẹn'" });
      console.log("Không thêm được 'Đặt hẹn'");
      throw error;
    }
  }
  // getAll
  static async index(req, res) {
    try {
      const appointment = await Appointment.findAll();
      return res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ error: "Không nhận được danh sách 'Đặt hẹn'!" });
      console.log("Không nhận được danh sách 'Đặt hẹn'");
      throw error;
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    try {
      const appointment = await Appointment.findByPk(id);
      return res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ error: "Không tìm được 'Đặt hẹn'" });
      console.log("Không tìm được 'Đặt hẹn'");
      throw error;
    }
  }

  static async destroy(req, res) {
    const id = req.params.id;
    try {
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return res
          .status(404)
          .json({ error: "'Thanh toán Đặt hẹn' không tồn tại" });
      }

      await appointment.destroy();
      console.log(`Đã xóa 'Đặt hẹn' với ID: ${id}`);
      return res.status(200).json({ message: "Xóa 'Đặt hẹn' thành công!" });
    } catch (error) {
      res.status(500).json({ error: "Không thể xóa 'Đặt hẹn'" });
      console.log("Không thể xóa 'Đặt hẹn'", error);
      throw error;
    }
  }
  static async update(req, res) {
    const id = req.params.id;
    const dataUpdated = req.body;
    try {
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return res.status(404).json({ error: "'Đặt hẹn' không tồn tại" });
      }

      // Sử dụng where để cập nhật đúng bản ghi
      await appointment.update(dataUpdated, {
        where: { id: id },
      });

      const updatedAppointment = await Appointment.findByPk(id);
      return res.status(200).json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ error: "Không cập nhật 'Đặt hẹn'" });
      console.log("Không thể cập nhật 'Đặt hẹn'", error);
      throw error;
    }
  }
}

module.exports = AppointmentController;
