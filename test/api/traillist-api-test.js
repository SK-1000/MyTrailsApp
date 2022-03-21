import { assert } from "chai";
import { mytrailsService } from "./mytrails-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, maggieCredentials, scenic, testTraillists } from "../fixtures.js";

suite("Traillist API tests", () => {

  let user = null;

  setup(async () => {
    mytrailsService.clearAuth();
    user = await mytrailsService.createUser(maggie);
    await mytrailsService.authenticate(maggieCredentials);
    await mytrailsService.deleteAllTraillists();
    await mytrailsService.deleteAllUsers();
    user = await mytrailsService.createUser(maggie);
    await mytrailsService.authenticate(maggieCredentials);
    scenic.userid = user._id;
  });

  teardown(async () => {});

  test("create traillist", async () => {
    const returnedTraillist = await mytrailsService.createTraillist(scenic);
    assert.isNotNull(returnedTraillist);
    assertSubset(scenic, returnedTraillist);
  });

  test("delete a traillist", async () => {
    const traillist = await mytrailsService.createTraillist(scenic);
    const response = await mytrailsService.deleteTraillist(traillist._id);
    assert.equal(response.status, 204);
    try {
      const returnedTraillist = await mytrailsService.getTraillist(traillist.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Traillist with this id", "Incorrect Response Message");
    }
  });

  test("create multiple traillists", async () => {
    for (let i = 0; i < testTraillists.length; i += 1) {
      testTraillists[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await mytrailsService.createTraillist(testTraillists[i]);
    }
    let returnedLists = await mytrailsService.getAllTraillists();
    assert.equal(returnedLists.length, testTraillists.length);
    await mytrailsService.deleteAllTraillists();
    returnedLists = await mytrailsService.getAllTraillists();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant traillist", async () => {
    try {
      const response = await mytrailsService.deleteTraillist("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Traillist with this id", "Incorrect Response Message");
    }
  });
});