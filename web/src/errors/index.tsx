// TypeScript 2.1 had a breaking changes regarding Extending built-ins like Error.
// From the TypeScript breaking changes documentation
export class APIException extends Error {
  constructor(message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, APIException.prototype);
  }
}

// Then you can use:

// let error = new FooError("Something really bad went wrong");
// if(error instanceof FooError)
// }