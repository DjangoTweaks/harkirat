function globalErrorHandler(error,req,res,next)
{

    res.status(500).json({
        message: "Internal Server Error",
        error: error
    })
}

module.exports = globalErrorHandler;