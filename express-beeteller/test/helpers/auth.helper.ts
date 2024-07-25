import supertest from "supertest";

import { app } from "../../src/config/express.config";
import { getMessage } from "../../src/utils/message.util";
import { USER } from "../mocks/user.mock";

const signInRequest = async (
  email: string,
  password: string,
  statusCode: number
) => {
  const response = await supertest(app).get(`/sign-in`).auth(email, password);

  expect(response.body).toBeDefined();
  expect(response.body).toBeInstanceOf(Object);
  expect(Array.isArray(response.body)).toBe(false);
  expect(typeof response.body).toBe("object");
  expect(response.body).toHaveProperty("message");

  switch (statusCode) {
    case 200:
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        message: getMessage("user.valid.sign_in.success"),

        metadata: expect.objectContaining({
          accessToken: expect.any(String),
        }),
      });
      USER.token = response.body.metadata.accessToken;
      break;
    case 401:
      expect(response.status).toBe(401);
      expect(response.body).toMatchObject({
        message: getMessage("default.unauthorized"),
      });
      break;
    default:
      throw new Error("Unexpected status code");
  }
};

const signInTest = async (
  email: string,
  password: string,
  statusCode: number
) => {
  it("POST /sign-up", async () => {
    const response = await supertest(app).get(`/sign-in`).auth(email, password);

    expect(response.body).toBeDefined();
    expect(response.body).toBeInstanceOf(Object);
    expect(Array.isArray(response.body)).toBe(false);
    expect(typeof response.body).toBe("object");
    expect(response.body).toHaveProperty("message");
    console.log("SIGN IN");
    console.log({
      email,
      password,
      body: response.body,
    });
    switch (statusCode) {
      case 200:
        console.log({
          statusCode: response.statusCode,
          status: response.status,
          bool: response.status === 200,
        });
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          message: getMessage("user.valid.sign_in.success"),
          data: { _id: USER._id },
          metadata: expect.objectContaining({
            accessToken: expect.any(String),
          }),
        });
        USER.token = response.body.metadata.accessToken;
        break;
      case 401:
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
          message: getMessage("default.unauthorized"),
        });
        break;
      default:
        throw new Error("Unexpected status code");
    }
  });
};

export { signInRequest, signInTest };
