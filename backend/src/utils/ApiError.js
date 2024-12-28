class ApiError extends Error {
    constructor(statusCode,
        message="something went wrong",
        errors=[],
        stack=""
    ){
        super(message);
        this.errors = errors;
        this.data=null;
        this.statusCode = false;
        if(stack)
        {
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this,this.contructor);
        }
    }
}

export {ApiError}