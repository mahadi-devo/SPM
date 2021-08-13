const Joi = require('joi');

const register = Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
    role: Joi.string().valid('buyer', 'seller'),
});

const login = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
});

module.exports = { register, login };
