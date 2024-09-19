
class ApiErrorHandler extends Error {
    constructor( statusCode , message = "Error :: an error occurred while running the app" , errors = [] , stack = ""  ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
        
        if(stack) {
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }

        console.log( `Error :: ${this.message}` )

    }
}


export { ApiErrorHandler }