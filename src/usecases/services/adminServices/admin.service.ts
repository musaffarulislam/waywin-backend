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

    public async getVerifyTrainerInformation(){
        try{
            const allTrainersInfo = await this.adminRepository.getAllTrainerInformation()
            const verifyTrainersInfo = allTrainersInfo.filter((trainer: any) => trainer.isVerified);
            return {verifyTrainersInfo}
        }catch(error){
            throw error
        }
    }

    public async getUnverifyTrainerInformation(){
        try{
            const allTrainersInfo = await this.adminRepository.getAllTrainerInformation()
            const unverifyTrainersInfo = allTrainersInfo.filter((trainer: any) => !trainer.isVerified);
            return {unverifyTrainersInfo}
        }catch(error){
            throw error
        }
    }

    public async getAllTags(){
        try{
            const tags = await this.adminRepository.getAllTags();
            return {tags: tags.tags}
        }catch(error){
            throw error
        }
    }

    public async addTag(tag: string){
        try{
            await this.adminRepository.addTag(tag)
        }catch(error){
            throw error
        }
    }

    public async editTag(index: number, tag: string){
        try{
            await this.adminRepository.editTag(index, tag)
        }catch(error){
            throw error
        }
    }

    public async deleteTag(index: number){
        try{
            await this.adminRepository.deleteTag(index)
        }catch(error){
            throw error
        }
    }

    public async getAllBookings(){
        try{
            return await this.adminRepository.getAllBookings(); 
        }catch(error){
            throw error
        }
    }

    public async getChartData(){
        try{
            return await this.adminRepository.getChartData(); 
        }catch(error){
            throw error
        }
    }

}