import { db } from "../models/db.js";
import { TrailSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const traillistController = {
  index: {
    handler: async function (request, h) {
      const traillist = await db.traillistStore.getTraillistById(request.params.id);
      const viewData = {
        title: "Traillist",
        traillist: traillist,
      };
      return h.view("traillist-view", viewData);
    },
  },

  addTrail: {
    validate: {
      payload: TrailSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("traillist-view", { title: "Add trail error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const traillist = await db.traillistStore.getTraillistById(request.params.id);
      const newTrail = {
        trailname: request.payload.trailname,
        terraindescription: request.payload.terraindescription,
        startpoint: request.payload.startpoint,
        longitude: Number(request.payload.longitude),
        latitude: Number(request.payload.latitude),
        distancekm: Number(request.payload.distancekm),
      };
      await db.trailStore.addTrail(traillist._id, newTrail);
      return h.redirect(`/traillist/${traillist._id}`);
    },
  },
  deleteTrail: {
    handler: async function(request, h) {
      const traillist = await db.traillistStore.getTraillistById(request.params.id);
      await db.trailStore.deleteTrail(request.params.trailid);
      return h.redirect(`/traillist/${traillist._id}`);
    },
  },

  uploadImage: {
    handler: async function(request, h) {
      try {
        const traillist = await db.traillistStore.getTraillistById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          traillist.img = url;
          db.traillistStore.updateTraillist(traillist);
        }
        return h.redirect(`/traillist/${traillist._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/traillist/${traillist._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  }

};