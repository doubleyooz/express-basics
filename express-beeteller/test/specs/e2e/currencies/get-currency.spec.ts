import { getCurrency } from "../../../helpers/currency.helper";
import { createUser } from "../../../helpers/user.helper";
import { USER } from "../../../mocks/user.mock";

describe("Currencies", () => {
  createUser({ email: USER.email, password: USER.password, n: 1 }, 200);

  describe("should work", () => {
    getCurrency("USD-BRL", 200);
  });

  describe("should reject", () => {
    getCurrency("USSD-BRL", 400);
    getCurrency("US2SD-BRL", 400);
  });
});
