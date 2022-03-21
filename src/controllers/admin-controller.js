
import { db } from "../models/db.js";

export const adminController = {
    index: {
        handler: async function (request, h) {
          const user = await db.userStore.getAllUsers();
          const viewData = {
            title: "User",
            user: user,
          };
          return h.view("admin-view", viewData);
        },
      },

      deleteUser: {
        handler: async function (request, h) {
          const user = await db.userStore.getUserById(request.params.id);
          await db.userStore.deleteUserById(user._id);
          return h.redirect("/admin");
        },
      },
  };

