const { ExaminationPayments, Assignment } = require("../models");

class ExaminationPaymentsController {
  static async store(req, res) {
    try {
      const examinationPayment = await ExaminationPayments.create(req.body);
      return res.status(200).json(examinationPayment);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Không thêm được 'Thanh toán Khám bệnh'!" });
      console.log("Không thêm được 'Thanh toán Khám bệnh'");
      throw error;
    }
  }
  // getAll
  static async index(req, res) {
    try {
      const examinationPayment = await ExaminationPayments.findAll();
      return res.status(200).json(examinationPayment);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Không nhận được danh sách 'Thanh toán Khám bệnh'" });
      console.log("Không nhận được danh sách 'Thanh toán Khám bệnh'");
      throw error;
    }
  }
  static async show(req, res) {
    const id = req.params.id;
    try {
      const examinationPayment = await ExaminationPayments.findByPk(id);
      return res.status(200).json(examinationPayment);
    } catch (error) {
      res.status(500).json({ error: "Không tìm được 'Thanh toán Khám bệnh'" });
      console.log("Không tìm được 'Thanh toán Khám bệnh'");
      throw error;
    }
  }
  static async show(req, res) {
    const id = req.params.id;
    try {
      const examinationPayment = await ExaminationPayments.findByPk(id);
      return res.status(200).json(examinationPayment);
    } catch (error) {
      res.status(500).json({ error: "Không tìm được 'Thanh toán Khám bệnh'" });
      console.log("Không tìm được 'Thanh toán Khám bệnh'");
      throw error;
    }
  }
  static async destroy(req, res) {
    const id = req.params.id;
    try {
      const examinationPayment = await ExaminationPayments.findByPk(id);
      if (!examinationPayment) {
        return res
          .status(404)
          .json({ error: "'Thanh toán Khám bệnh' không tồn tại" });
      }

      await examinationPayment.destroy();
      return res.status(204).send("Xóa 'Thanh toán khám bệnh' thành công!"); // Trả về 204 No Content khi xóa thành công
    } catch (error) {
      res.status(500).json({ error: "Không thể xóa 'Thanh toán Khám bệnh'" });
      console.log("Không thể xóa 'Thanh toán Khám bệnh'", error);
      throw error;
    }
  }
  static async update(req, res) {
    const id = req.params.id;
    const dataUpdated = req.body;
    try {
      const examinationPayment = await ExaminationPayments.findByPk(id);
      if (!examinationPayment) {
        return res
          .status(404)
          .json({ error: "'Thanh toán Khám bệnh' không tồn tại" });
      }

      await examinationPayment.update(dataUpdated);
      return res.status(200).json(examinationPayment);
    } catch (error) {
      res.status(500).json({ error: "Không cập nhật 'Thanh toán Khám bệnh'" });
      console.log("Không thể cập nhật 'Thanh toán Khám bệnh'", error);
      throw error;
    }
  }
  // static async totalPrice(){
  //   const getTotalPrice = async (req, res) => {
  //     try {
  //       const items = await Assignment.findAll();
  //       const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
  //       res.json({ totalPrice });
  //     } catch (error) {
  //       res.status(500).json({ message: 'Lỗi tính tổng tiền chỉ định!', error });
  //     }
  //   };
  // }
}

module.exports = ExaminationPaymentsController;
