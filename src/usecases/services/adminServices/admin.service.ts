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

    public async getActiveUserInformation(){
        try{
            const allUsersInfo = await this.adminRepository.getAllUserInformation()
            const activeUsersInfo = allUsersInfo.filter((user: any) => user.authId.isActive === true);
            return {activeUsersInfo}
        }catch(error){
            throw error
        }
    }

    public async getInactiveUserInformation(){
        try{
            const allUsersInfo = await this.adminRepository.getAllUserInformation()
            const inactiveUsersInfo = allUsersInfo.filter((user: any) => user.authId.isActive === false);
            return {inactiveUsersInfo}
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

    public async getActiveTrainerInformation(){
        try{
            const allTrainersInfo = await this.adminRepository.getAllTrainerInformation()
            const activeTrainersInfo = allTrainersInfo.filter((trainer: any) => trainer.authId.isActive === true);
            return {activeTrainersInfo}
        }catch(error){
            throw error
        }
    }

    public async getInactiveTrainerInformation(){
        try{
            const allTrainersInfo = await this.adminRepository.getAllTrainerInformation()
            const inactiveTrainersInfo = allTrainersInfo.filter((trainer: any) => trainer.authId.isActive === false);
            return {inactiveTrainersInfo}
        }catch(error){
            throw error
        }
    }

}