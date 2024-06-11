import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/errorhandeler';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server error';

  if(err.name == "CastError"){
    const message =  `Resources not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message,400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
