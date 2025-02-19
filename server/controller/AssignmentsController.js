const {
  Assignment,
} = require("../models");

class AssignmentController {
  static async store(req, res) {
    try {
      const assignment = await Assignment.create(req.body);
      return res.status(200).json(assignment);
    } catch (error) {
      res.status(500).json({ error: "Không thêm được 'chỉ định'" });
      console.log("Không thêm được 'chỉ định'");
      throw error;
    }
  }
  // getAll
  static async index(req, res) {
    try {
      const assignment = await Assignment.findAll();
      return res.status(200).json(assignment);
    } catch (error) {
      res.status(500).json({ error: "Không nhận được danh sách 'chỉ định'" });
      console.log("Không nhận được danh sách 'chỉ định'");
      throw error;
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    try {
      const assignment = await Assignment.findByPk(id);
      return res.status(200).json(assignment);
    } catch (error) {
      res.status(500).json({ error: "Không tìm được 'chỉ định'" });
      console.log("Không tìm được 'chỉ định'");
      throw error;
    }
  }

  static async destroy(req, res) {
    const id = req.params.id;
    try {
      const assignment = await Assignment.findByPk(id);
      if (!assignment) {
        return res
          .status(404)
          .json({ error: "'Thanh toán Khám bệnh' không tồn tại" });
      }

      await assignment.destroy();
      return res.status(204).send("Xóa 'Chỉ định' thành công!"); // Trả về 204 No Content khi xóa thành công
    } catch (error) {
      res.status(500).json({ error: "Không thể xóa 'Chỉ định'" });
      console.log("Không thể xóa 'Chỉ định'", error);
      throw error;
    }
  }
  static async update(req, res) {
    const id = req.params.id;
    const dataUpdated = req.body;
    try {
      const assignment = await Assignment.findByPk(id);
      if (!assignment) {
        return res.status(404).json({ error: "'Chỉ định' không tồn tại" });
      }

      await assignment.update(dataUpdated);
      return res.status(200).json(assignment);
    } catch (error) {
      res.status(500).json({ error: "Không cập nhật 'Chỉ định'" });
      console.log("Không thể cập nhật 'Chỉ định'", error);
      throw error;
    }
  }
}

module.exports = AssignmentController;
