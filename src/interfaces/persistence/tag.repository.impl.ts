import TagModel, {ITags} from '../models/TagModel';

export class TagRepositoryImpl { 
  
  public async findTags(): Promise<ITags | null> {
    try {
      return await TagModel.findOne()
    } catch (error) {
      throw new Error('Failed to create user.');
    }
  }

}
