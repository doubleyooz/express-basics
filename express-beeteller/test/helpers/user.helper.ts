import mongoose from "mongoose";
import supertest from "supertest";

import { app } from "../../src/config/express.config";
import { getMessage } from "../../src/utils/message.util";
import { USER, USER_2 } from "../mocks/user.mock";
import { signInRequest } from "./auth.helper";

const itif = (condition: boolean) => (condition ? it : it.skip);
const email = false;

const getPayloadData = (n: number, _id: any) => {
  switch (n) {
    case 1:
      USER._id = _id;
      return { email: USER.email, _id: USER._id };

    default:
      USER_2._id = _id;
      return { email: USER_2.email, _id: USER_2._id };
  }
};

const createUser = (payload: any, statusCode: number, attemptSignIn = true) => {
  it("POST /sign-up", async () => {
    const createUserResponse = await supertest(app)
      .post("/users")
      .send(payload);

    expect(createUserResponse.body).toBeDefined();
    expect(createUserResponse.body).toBeInstanceOf(Object);
    expect(Array.isArray(createUserResponse.body)).toBe(false);
    expect(typeof createUserResponse.body).toBe("object");
    expect(createUserResponse.body).toHaveProperty("message");

    const data = getPayloadData(payload.n, createUserResponse.body.data._id);

    switch (statusCode) {
      case 200:
        console.log({
          statusCode: createUserResponse.statusCode,
          status: createUserResponse.status,
          body: createUserResponse.body,
        });
        expect(createUserResponse.status).toEqual(200);
        expect(createUserResponse.body).toMatchObject({
          message: getMessage("user.valid.sign_up.success"),
          data: data,
        });
        if (attemptSignIn)
          await signInRequest(payload.email, payload.password, 200);
        break;

      case 400:
        expect(createUserResponse.status).toEqual(400);
        expect(createUserResponse.body).toMatchObject({
          message: getMessage("default.badRequest"),
        });
        break;
      default:
        expect(1).toEqual(2);
        break;
    }
  });
};

const findOne = (statusCode: number, _id?: string) => {
  it("GET /users/:id", async () => {
    await supertest(app)
      .get(`/users/${_id ? _id : USER._id}`)
      .set("Authorization", "Bearer " + USER.token)
      .then((response) => {
        expect(
          typeof response.body === "object" &&
            !Array.isArray(response.body) &&
            response.body !== null
        ).toBeTruthy();

        switch (statusCode) {
          case 200:
            expect(response.status).toEqual(200);
            USER._id = response.body.data._id;
            expect(response.body).toMatchObject({
              message: getMessage("user.findOne.success"),
              data: { email: USER.email, _id: USER._id },
            });
            break;
          case 401:
            expect(response.status).toEqual(401);
            expect(response.body).toMatchObject({
              message: getMessage("default.unauthorized"),
            });
            break;
          case 400:
            expect(response.status).toEqual(400);
            expect(response.body).toMatchObject({
              message: getMessage("default.badRequest"),
            });
            break;
          case 404:
            expect(response.status).toEqual(404);
            expect(response.body).toMatchObject({
              message: getMessage("user.notfound"),
            });
            break;
          default:
            expect(1).toEqual(2);
            break;
        }
      });
  });
};

const remove = (statusCode: number, _id?: string) => {
  it("DELETE /users/:id", async () => {
    await supertest(app)
      .delete(`/users/${_id ? _id : USER._id}`)
      .set("Authorization", "Bearer " + USER.token)
      .then((response) => {
        expect(
          typeof response.body === "object" &&
            !Array.isArray(response.body) &&
            response.body !== null
        ).toBeTruthy();

        switch (statusCode) {
          case 200:
            expect(response.status).toEqual(200);
            expect(response.body).toMatchObject({
              message: getMessage("user.delete.success"),
            });
            break;

          case 400:
            expect(response.status).toEqual(400);
            expect(response.body).toMatchObject({
              message: getMessage("default.badRequest"),
            });
            break;
          case 401:
            expect(response.status).toEqual(401);
            expect(response.body).toMatchObject({
              message: getMessage("default.unauthorized"),
            });
            break;

          case 404:
            expect(response.status).toEqual(404);
            expect(response.body).toMatchObject({
              message: getMessage("user.notfound"),
            });
            break;
          default:
            expect(1).toEqual(2);
            break;
        }
      });
  });

  it("GET /users/:id", async () => {
    await supertest(app)
      .get(`/users/${_id ? _id : USER._id}`)
      .set("Authorization", "Bearer " + USER.token)
      .then((response) => {
        expect(
          typeof response.body === "object" &&
            !Array.isArray(response.body) &&
            response.body !== null
        ).toBeTruthy();
        if (_id) {
          switch (statusCode) {
            case 404:
              expect(response.status).toEqual(404);
              expect(response.body).toMatchObject({
                message: getMessage("user.notfound"),
              });
              break;
            case 401:
              if (
                mongoose.Types.ObjectId.isValid(_id) &&
                String(new mongoose.Types.ObjectId(_id)) === _id
              ) {
                expect(response.status).toEqual(404);
                expect(response.body).toMatchObject({
                  message: getMessage("user.notfound"),
                });
              } else {
                expect(response.status).toEqual(400);
                expect(response.body).toMatchObject({
                  message: getMessage("default.badRequest"),
                });
              }

              break;

            case 400:
              expect(response.status).toEqual(400);
              expect(response.body).toMatchObject({
                message: getMessage("default.badRequest"),
              });
              break;

            case 200:
              expect(response.status).toEqual(401);
              expect(response.body).toMatchObject({
                message: getMessage("default.unauthorized"),
              });
              break;
            default:
              expect(1).toEqual(2);
              break;
          }
        } else {
          switch (statusCode) {
            case 404:
              expect(response.status).toEqual(200);
              expect(response.body).toMatchObject({
                message: getMessage("user.findOne.success"),
              });
              break;

            case 400:
              expect(response.status).toEqual(200);
              expect(response.body).toMatchObject({
                message: getMessage("user.findOne.success"),
              });
              break;

            case 200:
              expect(response.status).toEqual(401);
              expect(response.body).toMatchObject({
                message: getMessage("default.unauthorized"),
              });
              break;
            default:
              expect(1).toEqual(2);
              break;
          }
        }
      });
  });
};

const schema = (payload: { _id: string; name: string; email: string }) => {
  return {
    _id: payload._id,
    name: payload.name,
    email: payload.email,
  };
};

const sign_in = (payload: { _id: string; tokenVersion: number }) => {
  return {
    tokenVersion: payload.tokenVersion,
    _id: payload._id,
  };
};

export { createUser, findOne, remove, schema };
