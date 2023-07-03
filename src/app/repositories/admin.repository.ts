import { AdminApproveRepositoryImpl } from "../../interfaces/persistence/admin.approve.repository.impl";
import { AdminRepositoryImpl } from "../../interfaces/persistence/admin.repository.impl";

const adminRepository = new AdminRepositoryImpl()
const adminApproveRepository = new AdminApproveRepositoryImpl()
export{
    adminRepository,
    adminApproveRepository
}