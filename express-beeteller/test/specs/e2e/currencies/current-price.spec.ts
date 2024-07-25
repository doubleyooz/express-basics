import { currentPrice } from "../../../helpers/currency.helper";
import { createUser } from "../../../helpers/user.helper";
import { USER } from "../../../mocks/user.mock";

describe("Currencies", () => {
  createUser({ email: USER.email, password: USER.password, n: 1 }, 200);

  describe("should work", () => {
    currentPrice(200);
  });

  describe("should reject", () => {
    currentPrice(200);
  });
});
