export class TagService {

    constructor(private readonly tagRepository: any) {
    }

    public async getTags(){
        try{
        console.log("Services")
        const tagsModel = await this.tagRepository.findTags();
        const tags = tagsModel.tags;
        return {tags};
        }catch(error){
          throw error
        }
      }
}