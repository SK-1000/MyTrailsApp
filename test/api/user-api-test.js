import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { mytrailsService } from "./mytrails-service.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    mytrailsService.clearAuth();
    await mytrailsService.createUser(maggie);
    await mytrailsService.authenticate(maggieCredentials);
    await mytrailsService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await mytrailsService.createUser(testUsers[i]);
    }
    await mytrailsService.createUser(maggie);
    await mytrailsService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await mytrailsService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await mytrailsService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await mytrailsService.deleteAllUsers();
    await mytrailsService.createUser(maggie);
    await mytrailsService.authenticate(maggieCredentials);
    returnedUsers = await mytrailsService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await mytrailsService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await mytrailsService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await mytrailsService.deleteAllUsers();
    await mytrailsService.createUser(maggie);
    await mytrailsService.authenticate(maggieCredentials);
    try {
      const returnedUser = await mytrailsService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});