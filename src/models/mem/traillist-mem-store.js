import { v4 } from "uuid";
import { trailMemStore } from "./trail-mem-store.js";

let traillists = [];

export const traillistMemStore = {
  async getAllTraillists() {
    return traillists;
  },

  async addTraillist(traillist) {
    traillist._id = v4();
    traillists.push(traillist);
    return traillist;
  },

  async getUserTraillists(userid) {
    return traillists.filter((traillist) => traillist.userid === userid);
  },
 
  async getTraillistById(id) { 
    const list = traillists.find((traillist) => traillist._id === id);
    list.trails = await trailMemStore.getTrailsByTraillistId(list._id);
    return list;
  },


  async deleteTraillistById(id) {
    const index = traillists.findIndex((traillist) => traillist._id === id);
    traillists.splice(index, 1);
  },

  async deleteAllTraillists() {
    traillists = [];
  },
};