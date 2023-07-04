export class AdminApproveService {

    constructor(private readonly adminRepository: any) {
    }

    public async changeAuthStatus(authId: string){
        try{
            await this.adminRepository.changeAuthStatus(authId)
        }catch(error){
            throw error
        }
    }

    public async changeTrainerStatus(authId: string){
        try{
            await this.adminRepository.changeTrainerStatus(authId)
        }catch(error){
            throw error
        }
    }

}