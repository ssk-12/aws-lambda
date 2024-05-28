const { validationResult } = require("express-validator") ;

const validateMiddleware = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    const errorObject = {};
    errors.array().forEach((error) => (errorObject[error.param] = error));
    return res.status(400).json({ errors: errorObject });
  };
};

module.exports = validateMiddleware;
