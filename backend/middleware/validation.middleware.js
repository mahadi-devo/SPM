const Joi = require('joi');

const validateMiddleware = (Schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = Schema.validate(req[property]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      console.log('error', message);
      res.status(422).json({ error: message });
    }
  };
};

module.exports = validateMiddleware;
