import { signInTest } from "../../../helpers/auth.helper";
import { latestPrice } from "../../../helpers/currency.helper";
import { createUser } from "../../../helpers/user.helper";
import { USER } from "../../../mocks/user.mock";

describe("Currencies", () => {
  createUser({ email: USER.email, password: USER.password, n: 1 }, 200);
  signInTest(USER.email, USER.password, 200);

  describe("should work", () => {
    latestPrice("USD-BRL", 30, 200);
    latestPrice("USD-BRL", 60, 200);
  });

  describe("should reject", () => {
    latestPrice("USD-BRL", 20, 400);
    latestPrice("USDD-BRL", 30, 400);
    latestPrice("USDsaD-BRL", 30, 400);
    latestPrice("USDDd-BRL", 30, 400);
  });
});
