export class AdminApproveService {

    constructor(private readonly adminRepository: any) {
    }

    public async changeUserStatus(authId: string){
        try{
            console.log("User Id 2 : ",authId)
            await this.adminRepository.changeUserStatus(authId)
        }catch(error){
            throw error
        }
    }

}