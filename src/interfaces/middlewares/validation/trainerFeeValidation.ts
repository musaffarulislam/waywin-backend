import { Request, Response, NextFunction } from 'express';
import Joi, { Schema, ValidationResult } from 'joi';

export class TrainerFeeValidator {
    private static consultingFeeSchema: Schema = Joi.number().min(100).required().messages({
        'number.base': 'Consulting fee must be a number',
        'number.min': 'Consulting fee cannot be below 100',
        'any.required': 'Consulting fee is required',
    });

    private static trainingFeeSchema: Schema = Joi.number().min(500).required().messages({
        'number.base': 'Training fee must be a number',
        'number.min': 'Training fee cannot be below 500',
        'any.required': 'Training fee is required',
    });

    public validateFeeData(req: Request, res: Response, next: NextFunction): any {
        const { error }: ValidationResult = TrainerFeeValidator.feeSchema.validate(req.body);
        if (error) {
            console.log(error.details[0].message);
            return res.status(400).json({ message: error.details[0].message });
        }

        next();
    }

    private static feeSchema: Schema = Joi.object({
        consultingFee: TrainerFeeValidator.consultingFeeSchema,
        trainingFee: TrainerFeeValidator.trainingFeeSchema,
    });
}
