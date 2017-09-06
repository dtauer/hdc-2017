// This handler creates a function wrapper around async functions
// You can use Try/Catch around the functions too for custom error handling
exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next)
  }
}