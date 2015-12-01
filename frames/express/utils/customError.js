var getStackTrace = function() {
  var obj = {};
  Error.captureStackTrace(obj, getStackTrace);
  return obj.stack;
};
 
function foo(){
    return getStackTrace();
}

function CustomError(msg) {
	this.stack = getStackTrace().replace(/\bError\b/, this.constructor.name + ": "+ msg);
	this.message = msg;
	this.name = this.constructor.name;
}

CustomError.prototype.toString = function() {
  return this.message;
};

module.exports = CustomError;