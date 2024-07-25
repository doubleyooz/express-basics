import { USER, FAKE_USER } from "../../../mocks/user.mock";
import { signInTest } from "../../../helpers/auth.helper";
import { createUser } from "../../../helpers/user.helper";

describe("Sessions", () => {
  console.log(USER);
  createUser({ email: USER.email, password: USER.password, n: 1 }, 200);
  describe("should accept", () => {
    signInTest(USER.email, USER.password, 200);
  });

  describe("should reject", () => {
    signInTest(FAKE_USER.email, USER.password, 401);
    signInTest(USER.email, FAKE_USER.password, 401);
    signInTest(FAKE_USER.email, FAKE_USER.password, 401);
  });
});
