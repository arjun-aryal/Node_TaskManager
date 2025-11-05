import Joi from "joi";
import sanitizeHtml from "sanitize-html";


export const labelSchema = Joi.object({
    
    name: Joi.string()
    .trim()
    .required()
    .custom(v => sanitizeHtml(v))
    .messages({
      "string.empty": "Label name is required"
    }),

    color: Joi.string()
    .trim()
    .required()
    .custom(v => sanitizeHtml(v))
    .messages({
      "string.empty": "Label name is required"
    })
}).options({ stripUnknown: true });



export const partialLabelSchema = labelSchema.fork(
  ["name", "color"],
  field => field.optional()
);
