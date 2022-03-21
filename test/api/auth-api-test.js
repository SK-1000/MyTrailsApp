import { assert } from "chai";
import { mytrailsService } from "./mytrails-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    mytrailsService.clearAuth();
    await mytrailsService.createUser(maggie);
    await mytrailsService.authenticate(maggieCredentials);
    await mytrailsService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await mytrailsService.createUser(maggie);
    const response = await mytrailsService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await mytrailsService.createUser(maggie);
    const response = await mytrailsService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    mytrailsService.clearAuth();
    try {
      await mytrailsService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });





});