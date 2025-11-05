import Joi from "joi";
import sanitizeHtml from "sanitize-html";


export const registerSchema = Joi.object({

    name : Joi.string()
    .trim()
    .min(2)
    .required()
    .custom((value) => sanitizeHtml(value))
    .messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters"
    }),

    email : Joi.string()
    .trim()
    .email()
    .required().messages({
        "string.empty": "Email is required",
        "string.email": "Email format is invalid"
    }),

    password : Joi.string()
     .trim()
     .min(6)
     .required()
     .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters"
    })

}).options({ stripUnknown: true });



export const loginSchema = Joi.object({

     email : Joi.string()
    .trim()
    .email()
    .required().messages({
        "string.empty": "Email is required",
        "string.email": "Email format is invalid"
    }),

    password : Joi.string()
     .trim()
     .min(6)
     .required()
     .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters"
    })

}).options({ stripUnknown: true });