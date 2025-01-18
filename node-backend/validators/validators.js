import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
})

export const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
    username: Joi.string().min(4).max(15).required(),
})


export const sensorSchema = Joi.object({
  sensorTag: Joi.string().required(),
});