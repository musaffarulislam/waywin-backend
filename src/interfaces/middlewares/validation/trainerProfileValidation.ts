import { Request, Response, NextFunction } from "express";
import Joi, { Schema, ValidationResult } from "joi";

export class TrainerProfileValidator {
    private static servicesSchema: Schema = Joi.array().items(Joi.string()).max(2).required().messages({
        "array.base": "Services must be an array",
        "array.max": "Services cannot have more than 2 items",
        "any.required": "Services is required",
    });

    private static descripitionSchema: Schema = Joi.string().max(1200).required().messages({
        "string.base": "Description must be a string",
        "string.max": "Description cannot exceed 250 characters",
        "any.required": "Description is required",
    });

    private static tagsSchema: Schema = Joi.array().items(Joi.string()).max(10).required().messages({
        "array.base": "Tags must be an array",
        "array.max": "Tags cannot have more than 10 items",
        "any.required": "Tags is required",
    });

    private static experienceSchema: Schema = Joi.number().min(0).required().messages({
        "number.base": "Experience must be a number",
        "number.min": "Experience cannot be below 0",
        "any.required": "Experience is required",
    });

    private static modeSchema: Schema = Joi.array().items(Joi.string()).max(2).required().messages({
        "array.base": "Mode must be an array",
        "array.max": "Mode cannot have more than 2 items",
        "any.required": "Mode is required",
    });


    public validateProfileData(req: Request, res: Response, next: NextFunction): any {
        const { error }: ValidationResult = TrainerProfileValidator.profileSchema.validate(req.body);
        if (error) { 
          console.log(error)
          return res.status(400).json({ message: error.details[0].message });
        }
    
        next();
      }

    private static profileSchema: Schema = Joi.object({
        services: TrainerProfileValidator.servicesSchema,
        description: TrainerProfileValidator.descripitionSchema,
        tags: TrainerProfileValidator.tagsSchema,
        experience: TrainerProfileValidator.experienceSchema,
        mode: TrainerProfileValidator.modeSchema
    })
}