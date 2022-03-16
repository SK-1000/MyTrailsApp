import { v4 } from "uuid";

let trails = [];

export const trailMemStore = {
  async getAllTrails() {
    return trails;
  },

  async addTrail(traillistId, trail) {
    trail._id = v4();
    trail.traillistid = traillistId;
    trails.push(trail);
    return trail;
  },

  async getTrailsByTraillistId(id) {
    return trails.filter((trail) => trail.traillistid === id);
  },

  async getTrailById(id) {
    return trails.find((trail) => trail._id === id);
  },

  async getTraillistTrails(traillistId) {
    return trails.filter((trail) => trail.traillistid === traillistId);
  },

  async deleteTrail(id) {
    const index = trails.findIndex((trail) => trail._id === id);
    trails.splice(index, 1);
  },

  async deleteAllTrails() {
    trails = [];
  },

  async updateTrail(trail, updatedTrail) {
    trail.trailname = updatedTrail.title;
    trail.terraindescription = updatedTrail.terraindescription;
    trail.startpoint = updatedTrail.startpoint;
    trail.longitude = updatedTrail.longitude;
    trail.latitude = updatedTrail.latitude;
    trail.distancekm = updatedTrail.distancekm;
  },
};