import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";
import Inert from "@hapi/inert";
import dotenv from "dotenv";
import Handlebars from "handlebars";
import path from "path";
import Joi from "joi";
import { fileURLToPath } from "url";
import HapiSwagger from "hapi-swagger";
import jwt from "hapi-auth-jwt2";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { apiRoutes } from "./api-routes.js";
import { validate } from "./api/jwt-utils.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

const swaggerOptions = {
  info: {
    title: "mytrails API",
    version: "0.1"
  },
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "Authorization",
      in: "header"
    }
  },
  security: [{ jwt: [] }]
};


async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
  });
  // await server.register(Vision);
  await server.register(Cookie);
  await server.register(jwt);
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] }
  });

  // await server.register(Inert);
  server.validator(Joi);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    redirectTo: "/",
    validateFunc: accountsController.validate,
  });
   server.auth.default("session");

   db.init("mongo");
   server.route(webRoutes);
   server.route(apiRoutes);
   await server.start();
   console.log("Server running on %s", server.info.uri);
 }

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();