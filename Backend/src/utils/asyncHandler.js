
const asyncHandler = (requestHandler) => {
    (req,res,next) => {
      Promise.resolve(requestHandler(req,res,next)).catch((error) => {
        next(error)
      })
    }
}

// This is explained version of asyncHandler which handles the request and invoke the promise then pass the parameters to the function || this is the higher order function
// const asyncHandler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next);
//     } catch (error) {
//         res.status(`Error :: error code: ${error.code || 500} `).json({
//             success : false,
//             message : error.message || 'an error occurred',
//         })
//     }
// }

export { asyncHandler }