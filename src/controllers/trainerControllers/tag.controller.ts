import {Request, Response } from 'express';
import { TagService } from '../../usecases/services/trainerServices/tag.service';
import { ITagArray } from '../../app/entity/trainer.entity'

export class TagController {
    private tagService: TagService;

    constructor(private readonly dependency: any){
        this.tagService = new TagService(this.dependency);
    }

    public getTags = async (req: Request, res: Response) => {
        try{
            console.log("Controller")
            const tags = await this.tagService.getTags();
            res.status(201).json(tags)
        }catch(error){
            res.status(400).json({error: "Something wrong"})
        }
    }
}