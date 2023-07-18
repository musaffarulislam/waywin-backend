import { Request, Response, NextFunction } from "express";
import Joi, { Schema, ValidationResult } from "joi";

const usernameRegex = /^[a-zA-Z0-9_-]+$/;

export class AuthValidator {
  private static usernameSchema: Schema = Joi.string().regex(/^[a-zA-Z0-9_-]+$/).trim().min(5).required().messages({
    "string.empty": "Username is required",
    "string.pattern.base": "Username can only contain alphanumeric characters, underscore, and hyphen",
    "string.min": "Username must be at least 5 character long",
  });

  private static emailSchema: Schema = Joi.string().email().trim().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
  });

  private static phoneNumberSchema: Schema = Joi.string().max(10).trim().regex(/^\d+$/).required().messages({
    "string.empty": "Phone number is required",
    "string.pattern.base": "Phone number can only contain digits",
    "string.max": "Phone number must be a maximum of 10 characters",
  });

  private static roleSchema: Schema = Joi.string().valid("User", "Trainer").required().messages({
    "string.empty": "Role is required",
    "any.only": "Invalid role",
  });

  private static passwordSchema: Schema = Joi.string()
    .min(6)
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]+$/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base": "Password must be at least 6 characters long and include one letter, one number, and one special character",
      "string.min": "Password must be at least 6 characters long",
    });

  public validateSignupData(req: Request, res: Response, next: NextFunction): any {
    const { error }: ValidationResult = AuthValidator.signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    next();
  }

  public validateLoginData(req: Request, res: Response, next: NextFunction): any {
    const { error }: ValidationResult = AuthValidator.loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    next();
  }

  private static signupSchema: Schema = Joi.object({
    username: AuthValidator.usernameSchema,
    email: AuthValidator.emailSchema,
    phoneNumber: AuthValidator.phoneNumberSchema,
    role: AuthValidator.roleSchema,
    password: AuthValidator.passwordSchema,
  });

  private static loginSchema: Schema = Joi.object({
    email: AuthValidator.emailSchema,
    password: AuthValidator.passwordSchema,
  });
}
