import jwt from "../../../src/utils/jwt.util";
import { FAKE_USER, USER } from "../../mocks/user.mock";

describe("Jwt", () => {
  const data = {
    _id: USER._id,
    tokenVersion: 0,
  };

  describe("should work", () => {
    it("retrieve the payload from the token", async () => {
      const token = jwt.generateJwt(data, 1);

      let payload: any = null;
      try {
        payload = jwt.verifyJwt(token!, 1);
      } catch (err) {}
      expect({
        _id: payload._id,
        tokenVersion: payload.tokenVersion,
      }).toEqual(data);
    });
  });

  describe("should fail", () => {
    it("retrieve the payload using the wrong key", async () => {
      const token = jwt.generateJwt(data, 1);

      let payload: any = null;
      try {
        payload = jwt.verifyJwt(token!, 2);
      } catch (err) {}
      expect(payload).toEqual(null);
    });
  });
});
