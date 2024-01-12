function return_success(data, message = "Data successfully retrieved", code = 200) {
  return this.status(code).json({
    success: true,
    data : data,
    message : message
  });
}

function return_error(error, message = "An error occurred", code = 500) {
  return this.status(code).json({
    success: false,
    error : error,
    message: message
  });
}

module.exports = function extendResponse(res) {
  res.return_success = return_success;
  res.return_error = return_error;
};
