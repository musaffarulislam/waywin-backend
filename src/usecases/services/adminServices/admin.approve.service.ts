export class AdminApproveService {

    constructor(private readonly adminRepository: any) {
    }

    public async changeUserStatus(userId: string){
        try{
            await this.adminRepository.changeUserStatus(userId)
        }catch(error){
            throw error
        }
    }

}