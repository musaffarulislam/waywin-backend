export class TagService {

    constructor(private readonly tagRepository: any) {
    }

    public async getTags(){
        try{ 
        const tagsModel = await this.tagRepository.findTags();
        const tags = tagsModel.tags;
        return {tags};
        }catch(error){
          throw error
        }
      }
}