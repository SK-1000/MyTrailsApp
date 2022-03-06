import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const TrailSpec = {
  trailname: Joi.string().required(),
  briefdescription: Joi.string().required(),
  startpoint: Joi.string().required(),
  longitude: Joi.number().allow("").optional(),
  latitude: Joi.number().allow("").optional(),
  distancekm: Joi.number().allow("").optional(),
};

export const TraillistSpec = {
  title: Joi.string().required(),
};