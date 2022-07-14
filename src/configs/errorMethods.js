module.exports = {

    ErrorNotFound(msg) {
        let error = new Error(msg);
        error.message = msg
        error.status = 404
        return error
    },

    ErrorUnauthorized(msg) {
        let error = new Error(msg)
        error.message = msg
        error.status = 401
        return error
      },

    ErrorBadRequest(msg) {
        let error = new Error(msg)
        error.message = msg
        error.status = 400
        return error
    }

}