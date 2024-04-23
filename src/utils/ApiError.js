class ApiError extends Error {
  constructor(
    statusCode,
    message= "something went wrong",
    errors = [],
    stack = ""

  ){
    super(message)
    this.statusCode = statusCode
    this.data = null
    this.message = message
    this.success = false
    this.errors = errors

//stack is used to check where the error is, like on what line
    if(stack){
      this.stack = stack
    }else{
      Error.captureStackTrace(this, this.construcot)
    }
  }
}

export {ApiError}