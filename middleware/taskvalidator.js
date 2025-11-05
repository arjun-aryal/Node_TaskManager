import Joi from "joi";
import sanitizeHtml from "sanitize-html";

export const taskSchema = Joi.object({
  title: Joi.string()
    .trim()
    .required()
    .custom((value, helpers) => {
      return sanitizeHtml(value);
    })
    .messages({ "any.required": "Title is required" }),

  description: Joi.string()
    .allow("")
    .optional()
    .custom((value, helpers) => {
      return sanitizeHtml(value);
    }),

  status: Joi.string()
    .valid("TODO", "IN_PROGRESS", "COMPLETED", "BLOCKED")
    .required(),

  priority: Joi.string()
    .valid("LOW", "MEDIUM", "HIGH", "URGENT")
    .required(),

  due_date: Joi.date().optional().allow(null),

  labels: Joi.array()
    .items(Joi.string().trim())
    .optional()

}).options({ stripUnknown: true });



export const partialTaskSchema = taskSchema.fork(
  ["title", "status", "priority"],
  field => field.optional()
);