import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validationMiddleware(type: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(type, req.body);
    const errors: ValidationError[] = await validate(dtoInstance, {
      skipMissingProperties: false,
      whitelist: true,
      forbidUnknownValues: true,
    });

    if (errors.length > 0) {
      const errorMessages = errors.map((error) => Object.values(error.constraints || {})).flat();
      return res.status(400).json({ errors: errorMessages });
    }

    req.body = dtoInstance;
    next();
  };
}
