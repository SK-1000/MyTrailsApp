import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testTraillists, testTrails, urban, scenic, caves, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Trail Model tests", () => {

  let urbanList = null;

  setup(async () => {
    db.init("mongo");
    await db.traillistStore.deleteAllTraillists();
    await db.trailStore.deleteAllTrails();
    urbanList = await db.traillistStore.addTraillist(urban);
    for (let i = 0; i < testTrails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testTrails[i] = await db.trailStore.addTrail(urbanList._id, testTrails[i]);
    }
  });

  test("create single trail", async () => {
    const scenicList = await db.traillistStore.addTraillist(scenic);
    const trail = await db.trailStore.addTrail(scenicList._id, caves)
    assert.isNotNull(trail._id);
    assertSubset (caves, trail);
  });

  test("get multiple trails", async () => {
    const trails = await db.trailStore.getTrailsByTraillistId(urbanList._id);
    assert.equal(testTrails.length, testTrails.length)
  });

  test("delete all trails", async () => {
    const trails = await db.trailStore.getAllTrails();
    assert.equal(testTrails.length, trails.length);
    await db.trailStore.deleteAllTrails();
    const newTrails = await db.trailStore.getAllTrails();
    assert.equal(0, newTrails.length);
  });

  test("get a trail - success", async () => {
    const scenicList = await db.traillistStore.addTraillist(scenic);
    const trail = await db.trailStore.addTrail(scenicList._id, caves)
    const newTrail = await db.trailStore.getTrailById(trail._id);
    assertSubset (caves, newTrail);
  });

  test("delete One Trail - success", async () => {
    await db.trailStore.deleteTrail(testTrails[0]._id);
    const trails = await db.trailStore.getAllTrails();
    assert.equal(trails.length, testTraillists.length - 1);
    const deletedTrail = await db.trailStore.getTrailById(testTrails[0]._id);
    assert.isNull(deletedTrail);
  });

  test("get a trail - bad params", async () => {
    assert.isNull(await db.trailStore.getTrailById(""));
    assert.isNull(await db.trailStore.getTrailById());
  });

  test("delete one trail - fail", async () => {
    await db.trailStore.deleteTrail("bad-id");
    const trails = await db.trailStore.getAllTrails();
    assert.equal(trails.length, testTraillists.length);
  });
});