const Joi = require("@hapi/joi");

const userSchema = {
  name: Joi.string()
    .min(3)
    .max(255)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  stripe: Joi.string(),
  notifications_sent: Joi.number()
    .integer()
    .min(0)
    .required(),
  account_type_id: Joi.number()
    .integer()
    .min(1)
    .max(3)
    .required()
};

const teamMemberSchema = {
  first_name: Joi.string()
    .min(3)
    .max(255)
    .required(),
  last_name: Joi.string()
    .min(3)
    .max(255)
    .required(),
  job_description: Joi.string()
    .min(3)
    .max(255),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .allow(null),
  phone_number: Joi.string(),
  slack_uuid: Joi.string()
    .token()
    .allow(null),
  user_id: Joi.number()
    .integer()
    .min(1)
    .required(),
  manager_id: Joi.number()
    .integer()
    .min(1)
    .allow(null),
  mentor_id: Joi.number()
    .integer()
    .min(1)
    .allow(null)
};

const trainingSeriesSchema = {
  title: Joi.string()
    .min(3)
    .max(255)
    .required(),
  user_id: Joi.number()
    .integer()
    .min(1)
    .required()
};

const messageSchema = {
  subject: Joi.string()
    .min(3)
    .max(255)
    .required(),
  body: Joi.string()
    .min(3)
    .max(255)
    .required(),
  link: Joi.string()
    .min(3)
    .max(255),
  training_series_id: Joi.number()
    .integer()
    .min(1)
    .required(),
  for_manager: Joi.boolean(),
  for_mentor: Joi.boolean()
};

const tokenSchema = {
  expiration: Joi.date().iso(),
  auth_token: Joi.string()
    .token()
    .required(),
  refresh_token: Joi.string().token(),
  service_id: Joi.number()
    .integer()
    .min(1)
    .required(),
  user_id: Joi.number()
    .integer()
    .min(1)
    .required()
};

const notificationSchema = {
  message_id: Joi.number()
    .integer()
    .min(1)
    .required(),
  service_id: Joi.number()
    .integer()
    .min(1)
    .required(),
  team_member_id: Joi.number()
    .integer()
    .min(1)
    .required(),
  send_date: Joi.date()
    .iso()
    .required(),
  is_sent: Joi.boolean(),
  num_attempts: Joi.number()
    .integer()
    .min(0),
  thread: Joi.string().min(3)
};

const responseSchema = {
  body: Joi.string(),
  notification_id: Joi.number()
    .integer()
    .min(1)
    .required(),
  created_at: Joi.date().timestamp() //defaults to "javascript", might need to pass in "unix" option
};

module.exports = {
  userSchema,
  teamMemberSchema,
  trainingSeriesSchema,
  messageSchema,
  tokenSchema,
  notificationSchema,
  responseSchema
};