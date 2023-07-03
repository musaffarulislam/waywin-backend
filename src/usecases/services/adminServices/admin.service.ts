export class AdminService {

    constructor(private readonly adminRepository: any) {
    }

    public async getAllUserInformation(){
        try{
            const allUsersInfo = await this.adminRepository.getAllUserInformation()
            return {allUsersInfo}
        }catch(error){
            throw error
        }
    }

    public async getAllTrainerInformation(){
        try{
            const allTrainersInfo = await this.adminRepository.getAllTrainerInformation()
            return {allTrainersInfo}
        }catch(error){
            throw error
        }
    }
}