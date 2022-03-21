import Joi from "joi";


export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");


export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");




export const TrailSpec = Joi.object()
  .keys({
  trailname: Joi.string().required(),
  terraindescription: Joi.string().required(),
  startpoint: Joi.string().required(),
  longitude: Joi.number().allow("").optional(),
  latitude: Joi.number().allow("").optional(),
  distancekm: Joi.number().allow("").optional(),
  traillistid: IdSpec,
})
.label("Trail");


export const TrailSpecPlus = TrailSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("TrailPlus");

export const TrailArraySpec = Joi.array().items(TrailSpecPlus).label("TrailArray");



export const TraillistSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("scenic"),
    userid: IdSpec,
    trails: TrailArraySpec,
  })
  .label("Traillist");

export const TraillistSpecPlus = TraillistSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("TraillistPlus");

export const TraillistArraySpec = Joi.array().items(TraillistSpecPlus).label("TraillistArray");