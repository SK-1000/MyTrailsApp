import { TrailSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
// import { route } from "@hapi/hapi/lib/cors";

export const trailController = {
  index: {
    handler: async function (request, h) {
      const traillist = await db.traillistStore.getTraillistById(request.params.id);
      const trail = await db.trailStore.getTrailById(request.params.trailid);
      const viewData = {
        title: "Edit Trail",
        traillist: traillist,
        trail: trail,
      };
      return h.view("trail-view", viewData);
    },
  },

  update: {
    validate: {
      payload: TrailSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("trail-view", { title: "Edit trail error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const trail = await db.trailStore.getTrailById(request.params.trailid);
      const newTrail = {
        trailname: request.payload.trailname,
        terraindescription: request.payload.terraindescription,
        startpoint: request.payload.startpoint,
        longitude: Number(request.payload.longitude),
        latitude: Number(request.payload.latitude),
        distancekm: Number(request.payload.distancekm),
      };
      await db.trailStore.updateTrail(trail, newTrail);
      return h.redirect(`/traillist/${request.params.id}`);
    },
  },
};