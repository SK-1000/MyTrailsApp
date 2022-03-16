import { assert } from "chai";
import { mytrailsService } from "./mytrails-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, testUsers } from "../fixtures.js";

suite("User API tests", () => {
  setup(async () => {
    await mytrailsService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[0] = await mytrailsService.createUser(testUsers[i]);
    }
  });
  teardown(async () => {
  });

  test("create a user", async () => {
    const newUser = await mytrailsService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await mytrailsService.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await mytrailsService.deleteAllUsers();
    returnedUsers = await mytrailsService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user - success", async () => {
    const returnedUser = await mytrailsService.getUser(testUsers[0]._id);
    assert.deepEqual(testUsers[0], returnedUser);
  });

  test("get a user - fail", async () => {
    try {
      const returnedUser = await mytrailsService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
    }
  });


});