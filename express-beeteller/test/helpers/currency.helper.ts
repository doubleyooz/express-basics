import supertest from "supertest";

import { app } from "../../src/config/express.config";
import { getMessage } from "../../src/utils/message.util";
import { USER } from "../mocks/user.mock";
import { BRL, BTC, EUR, USD } from "../../src/utils/constant.util";

const latestPrice = (currency: string, days: number, statusCode: number) => {
  it("GET /currencies/latest", async () => {
    await supertest(app)
      .get(`/currencies/latest?currency=${currency}&days=${days}`)
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
            expect(response.body.data.length === days).toBeTruthy();

            expect(response.body).toEqual({
              message: getMessage("currency.latest.prices"),
              data: expect.arrayContaining([
                expect.objectContaining({
                  high: expect.any(Number),
                  low: expect.any(Number),
                  pctChange: expect.any(String),
                  timestamp: expect.any(String),
                }),
              ]),
            });
            break;
          case 400:
            expect(response.status).toEqual(400);
            break;
          case 401:
            expect(response.status).toEqual(401);
            break;
          default:
            expect(1).toEqual(2);
            break;
        }
      });
  });
};

const currentPrice = (statusCode: number) => {
  it("GET /currencies/now", async () => {
    await supertest(app)
      .get(`/currencies/now`)
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
            expect(response.body.data.length === 3).toBeTruthy();

            expect(response.body).toEqual({
              message: getMessage("currency.current.prices"),
              data: expect.arrayContaining([
                expect.objectContaining({
                  name: USD + "/" + BRL,
                  code: USD,
                  codein: BRL,
                  bid: expect.any(String),
                }),
                expect.objectContaining({
                  name: BTC + "/" + EUR,
                  code: BTC,
                  codein: EUR,
                  bid: expect.any(String),
                }),
                expect.objectContaining({
                  name: BTC + "/" + USD,
                  code: BTC,
                  codein: USD,
                  bid: expect.any(String),
                }),
              ]),
            });
            break;
          case 400:
            expect(response.status).toEqual(400);
            break;
          case 401:
            expect(response.status).toEqual(401);
            break;
          default:
            expect(1).toEqual(2);
            break;
        }
      });
  });
};

const getCurrency = (currency: string, statusCode: number) => {
  const expectedData = {
    [currency.replace("-", "")]: {
      ask: expect.any(String),
      bid: expect.any(String),
      code: USD,
      codein: BRL,
      create_date: expect.any(String),
      high: expect.any(String),
      low: expect.any(String),
      name: expect.any(String),
      pctChange: expect.any(String),
      timestamp: expect.any(String),
      varBid: expect.any(String),
    },
    message: getMessage("currency.get.price"),
  };

  it("GET /currencies", async () => {
    await supertest(app)
      .get(`/currencies?currency=${currency}`)
      .set("Authorization", "Bearer " + USER.token)
      .then((response) => {
        expect(response.status).toBe(statusCode);
        expect(response.body).toEqual(expectedData);
      });
  });
};

export { latestPrice, currentPrice, getCurrency };
