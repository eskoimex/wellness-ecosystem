
const handleResSuccessAndLog = (db, res, logData, message, data, statusCode) => {
   return db.collection('activity_log').doc().set(logData)
        .then(() => {
          res.status(statusCode).json({
                message,
                data
            })
        })
        // .catch((error)=>{
        //     console.log("Error", error)
        // })
}

module.exports = { handleResSuccessAndLog }