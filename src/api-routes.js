import { userApi } from "./api/user-api.js";
import { traillistApi } from "./api/traillist-api.js";
import { trailApi } from "./api/trail-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/traillists", config: traillistApi.create },
  { method: "DELETE", path: "/api/traillists", config: traillistApi.deleteAll },
  { method: "GET", path: "/api/traillists", config: traillistApi.find },
  { method: "GET", path: "/api/traillists/{id}", config: traillistApi.findOne },
  { method: "DELETE", path: "/api/traillists/{id}", config: traillistApi.deleteOne },

  { method: "GET", path: "/api/trails", config: trailApi.find },
  { method: "GET", path: "/api/trails/{id}", config: trailApi.findOne },
  { method: "POST", path: "/api/traillists/{id}/trails", config: trailApi.create },
  { method: "DELETE", path: "/api/trails", config: trailApi.deleteAll },
  { method: "DELETE", path: "/api/trails/{id}", config: trailApi.deleteOne },
];