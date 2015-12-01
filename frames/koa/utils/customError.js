function CustomError(message) {
  this.message = message;
}

CustomError.prototype.toString = function() {
  return this.message;
};

module.exports = CustomError;