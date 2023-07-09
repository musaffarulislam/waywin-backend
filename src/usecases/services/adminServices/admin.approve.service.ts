export class AdminApproveService {

    constructor(private readonly adminRepositoryApprove: any) {
    }

    public async changeAuthStatus(authId: string){
        try{
            await this.adminRepositoryApprove.changeAuthStatus(authId)
        }catch(error){
            throw error
        }
    }

    public async trainerVerify(trainerId: string){
        try{
            await this.adminRepositoryApprove.trainerVerify(trainerId)
        }catch(error){
            throw error
        }
    }



}