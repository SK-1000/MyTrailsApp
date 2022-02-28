import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const traillists = await db.traillistStore.getUserTraillists(loggedInUser._id);
      const viewData = {
        title: "MyTrails Dashboard",
        user: loggedInUser,
        traillists: traillists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addTraillist: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newTrailList = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.traillistStore.addTraillist(newTrailList);
      return h.redirect("/dashboard");
    },
  },

  deleteTraillist: {
    handler: async function (request, h) {
      const traillist = await db.traillistStore.getTraillistById(request.params.id);
      await db.traillistStore.deleteTraillistById(traillist._id);
      return h.redirect("/dashboard");
    },
  },
};