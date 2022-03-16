import Boom from "@hapi/boom";
import { TraillistSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const traillistApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const traillists = await db.traillistStore.getAllTraillists();
        return traillists;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const traillist = await db.traillistStore.getTraillistById(request.params.id);
        if (!traillist) {
          return Boom.notFound("No Traillist with this id");
        }
        return traillist;
      } catch (err) {
        return Boom.serverUnavailable("No Traillist with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const traillist = request.payload;
        const newTraillist = await db.traillistStore.addTraillist(traillist);
        if (newTraillist) {
          return h.response(newTraillist).code(201);
        }
        return Boom.badImplementation("error creating traillist");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const traillist = await db.traillistStore.getTraillistById(request.params.id);
        if (!traillist) {
          return Boom.notFound("No Traillist with this id");
        }
        await db.traillistStore.deleteTraillistById(traillist._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Traillist with this id");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.traillistStore.deleteAllTraillists();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};