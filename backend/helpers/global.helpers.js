const HttpStatus = require('http-status-codes');

exports.errorMsg = (res, status, action, obj) => {
    res.status(HttpStatus.BAD_REQUEST).send({
      'status' : status,
      'action': action,
      'user': obj
    });
}
  
exports.sendMsg = (res, status, action, obj, token = null) => {
    res.status(HttpStatus.OK).send({
        'status' : status,
        'action': action,
        'user': obj,
        'token': token,
    });
}
