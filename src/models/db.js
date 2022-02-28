import { userMemStore } from "./mem/user-mem-store.js";
import { traillistMemStore } from "./mem/traillist-mem-store.js";
import { trailMemStore } from "./mem/trail-mem-store.js";

export const db = {
  userStore: null,
  traillistStore: null,
  trailStore: null,

  init() {
    this.userStore = userMemStore;
    this.traillistStore = traillistMemStore;
    this.trailStore = trailMemStore;
  },
};