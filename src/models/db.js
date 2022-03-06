import { userMemStore } from "./mem/user-mem-store.js";
import { traillistMemStore } from "./mem/traillist-mem-store.js";
import { trailMemStore } from "./mem/trail-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { traillistJsonStore } from "./json/traillist-json-store.js";
import { trailJsonStore } from "./json/trail-json-store.js";

export const db = {
  userStore: null,
  traillistStore: null,
  trailStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.traillistStore = traillistJsonStore;
        this.trailStore = trailJsonStore;
        break;
      default:
        this.userStore = userMemStore;
        this.traillistStore = traillistMemStore;
        this.trailStore = trailMemStore;
    }
  },
};