import { NextFunction, Request, Response } from "express";

interface AppError extends Error {
  status?: number;
  details?: unknown;
}

export const errorHandler = (err: AppError, _req: Request, res: Response, _next: NextFunction): void => {
  const status = err.status ?? 500;
  const payload: Record<string, unknown> = {
    message: err.message ?? "Unexpected error occurred",
  };

  if (err.details) {
    payload.details = err.details;
  }
  res.status(status).json(payload);
};
