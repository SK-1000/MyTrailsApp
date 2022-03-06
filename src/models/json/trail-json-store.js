import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/trails.json"));
db.data = { trails: [] };

export const trailJsonStore = {
  async getAllTrails() {
    await db.read();
    return db.data.trails;
  },

  async addTrail(traillistId, trail) {
    await db.read();
    trail._id = v4();
    trail.traillistid = traillistId;
    db.data.trails.push(trail);
    await db.write();
    return trail;
  },

  async getTrailsByTraillistId(id) {
    await db.read();
    return db.data.trails.filter((trail) => trail.traillistid === id);
  },

  async getTrailById(id) {
    await db.read();
    return db.data.trails.find((trail) => trail._id === id);
  },

  async deleteTrail(id) {
    await db.read();
    const index = db.data.trails.findIndex((trail) => trail._id === id);
    db.data.trails.splice(index, 1);
    await db.write();
  },

  async deleteAllTrails() {
    db.data.trails = [];
    await db.write();
  },

  async updateTrail(trail, updatedTrail) {
    trail.title = updatedTrail.title;
    trail.artist = updatedTrail.artist;
    trail.duration = updatedTrail.duration;
    await db.write();
  },
};