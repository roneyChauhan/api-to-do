module.exports = {
    throwError(status, errorCode, error) {
        throw {
            status: status || 500,
            ...(errorCode ? { errorCode: errorCode } : {}),
            ...(error ? { error: error } : {}),
        };
    },
    successRes(status, data){
        return {
            status: (status || 200) ? 'SUCCESS' : status,
            ...(data ? { data: data } : {}),
        }
    }
};