const { sequelize, Services, Assignments, AssignmentDetail } = require('../models');

class AssignmentService{
    static async createAssignment(patientReceptionId, assignmentDetails) {
        const transaction = await sequelize.transaction();
        try {
            //tạo transaction
            const services = await this.getServices(assignmentDetails, transaction);
            //gọi hàm tính toán tổng tiền của "số lượng" dịch vụ
            const { totalPrice, calculatedDetails } = this.calculatePrices(assignmentDetails, services);
            //tạo record chỉ định mới
            const newAssignment = await this.createAssignmentRecord(patientReceptionId, totalPrice, transaction);
            //tạo record chi tiết chỉ định mới
            const createdDetails = await this.createAssignmentDetails(newAssignment.id, calculatedDetails, transaction);
            //commit transaction
            await transaction.commit();
            //trả về record Chỉ định, tạo Chi tiết chỉ định từ mã chỉ định
            return { newAssignment, createdDetails };
        } catch (error) {
            await transaction.rollback();
            throw error; // Đẩy lỗi lên cho controller xử lý
        }
    }
    static async calculatePrices (assignmentDetails, tracsaction){
        
    }
}
module.exports = AssignmentService;