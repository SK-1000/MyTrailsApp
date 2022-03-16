import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const trailApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const trails = await db.trailStore.getAllTrails();
        return trails;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const trail = await db.trailStore.getTrailById(request.params.id);
        if (!trail) {
          return Boom.notFound("No trail with this id");
        }
        return trail;
      } catch (err) {
        return Boom.serverUnavailable("No trail with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const trail = await db.trailStore.addTrail(request.params.id, request.payload);
        if (trail) {
          return h.response(trail).code(201);
        }
        return Boom.badImplementation("error creating trail");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.trailStore.deleteAllTrails();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const trail = await db.trailStore.getTrailById(request.params.id);
        if (!trail) {
          return Boom.notFound("No Trail with this id");
        }
        await db.trailStore.deleteTrail(trail._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Trail with this id");
      }
    },
  },
};