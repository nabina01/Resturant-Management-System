export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const throwError = (message: string, statusCode: number = 400) => {
  throw new AppError(message, statusCode);
};
