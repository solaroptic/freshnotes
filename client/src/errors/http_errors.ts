//class instead of an interface because we already have an error class

class HttpError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
//this.constructor.name is the name of the class when it's called in an instance of the class

/**
 * Error class for 401 Unauthorized errors
 */
export class UnauthorizedError extends HttpError {}
/**
 * Error class for 409 conflict errors
 */
export class ConflictError extends HttpError {}
