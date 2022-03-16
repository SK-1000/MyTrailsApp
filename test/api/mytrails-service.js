import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const mytrailsService = {
  mytrailsUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.mytrailsUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.mytrailsUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.mytrailsUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.mytrailsUrl}/api/users`);
    return res.data;
  },

  async createTraillist(traillist) {
    const res = await axios.post(`${this.mytrailsUrl}/api/traillists`, traillist);
    return res.data;
  },

  async deleteAllTraillists() {
    const response = await axios.delete(`${this.mytrailsUrl}/api/traillists`);
    return response.data;
  },

  async deleteTraillist(id) {
    const response = await axios.delete(`${this.mytrailsUrl}/api/traillists/${id}`);
    return response;
  },

  async getAllTraillists() {
    const res = await axios.get(`${this.mytrailsUrl}/api/traillists`);
    return res.data;
  },

  async getTraillist(id) {
    const res = await axios.get(`${this.mytrailsUrl}/api/traillists/${id}`);
    return res.data;
  },
  async createTrail(_id, trail) {
    const res = await axios.post(`${this.mytrailsUrl}/api/traillists/${_id}/trails`, trail);
    return res.data;
  },
  async getTrail(id) {
    const res = await axios.get(`${this.mytrailsUrl}/api/trails/${id}`);
    return res.data;
  },
  async getAllTrails() {
    const res = await axios.get(`${this.mytrailsUrl}/api/trails`);
    return res.data;
  },
  async deleteTrail(id) {
      const res = await axios.delete(`${this.mytrailsUrl}/api/trails/${id}`);
      return res;
  },
  async deleteAllTrails() {
    const res = await axios.delete(`${this.mytrailsUrl}/api/trails`);
    return res.data;
  },
  async authenticate(user) {
    const response = await axios.post(`${this.mytrailsUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },
  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  }

};
