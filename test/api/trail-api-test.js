import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { mytrailsService } from "./mytrails-service.js";
import { maggie, scenic, testTraillists, testTrails, caves } from "../fixtures.js";

suite("Trail API tests", () => {
  let user = null;
  let toughTrails = null;

  
  setup(async () => {
    await mytrailsService.deleteAllTraillists();
    await mytrailsService.deleteAllUsers();
    await mytrailsService.deleteAllTrails();
    user = await mytrailsService.createUser(maggie);
    scenic.userid = user._id;
    toughTrails = await mytrailsService.createTraillist(scenic);
  });

  teardown(async () => {});

  test("create trail", async () => {
    const returnedTrail = await mytrailsService.createTrail(toughTrails._id, caves);
    assertSubset(caves, returnedTrail);
  });

  test("create Multiple trails", async () => {
    for (let i = 0; i < testTrails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await mytrailsService.createTrail(toughTrails._id, testTrails[i]);
    }
    const returnedTrails = await mytrailsService.getAllTrails();
    assert.equal(returnedTrails.length, testTrails.length);
    for (let i = 0; i < returnedTrails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const trail = await mytrailsService.getTrail(returnedTrails[i]._id);
      assertSubset(trail, returnedTrails[i]);
    }
  });

  test("Delete TrailApi", async () => {
    for (let i = 0; i < testTrails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await mytrailsService.createTrail(toughTrails._id, testTrails[i]);
    }
    let returnedTrails = await mytrailsService.getAllTrails();
    assert.equal(returnedTrails.length, testTrails.length);
    for (let i = 0; i < returnedTrails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const trail = await mytrailsService.deleteTrail(returnedTrails[i]._id);
    }
    returnedTrails = await mytrailsService.getAllTrails();
    assert.equal(returnedTrails.length, 0);
  });

  test("denormalised traillist", async () => {
    for (let i = 0; i < testTrails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
       await mytrailsService.createTrail(toughTrails._id, testTrails[i]);
    }
    const returnedTraillist = await mytrailsService.getTraillist(toughTrails._id);
    assert.equal(returnedTraillist.trails.length, testTrails.length);
    for (let i = 0; i < testTrails.length; i += 1) {
      assertSubset(testTrails[i], returnedTraillist.trails[i]);
    }
  });
});