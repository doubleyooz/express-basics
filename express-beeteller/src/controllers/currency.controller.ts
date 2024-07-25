import { Request, Response } from "express";
import axios from "axios";
import { getMessage } from "../utils/message.util";
import { date } from "yup";

// "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL";
const url = "https://economia.awesomeapi.com.br/json/";
const url2 = "https://api.kraken.com/0/public/Ticker?pair=XBTeur";
const url3 = "https://api.kraken.com/0/public/Ticker?pair=XBTusd";

const BTC = "BTC";
const BRL = "BRL";
const EUR = "EUR";
const USD = "USD";

async function latelyPrice(req: Request, res: Response) {
  const { currency, days } = req.query;

  const urlWithParams = `${url}daily/${currency}/${days}`;
  try {
    const response = await axios.get(urlWithParams);

    const data = response.data.map((item: any) => ({
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      pctChange: item.pctChange,
      timestamp: new Intl.DateTimeFormat("pt-BR").format(
        new Date(parseInt(item.timestamp) * 1e3)
      ),
    }));

    return res.status(200).json({
      data,
      message: getMessage("currency.lately.prices"),
      metadata: req.new_token,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: err,
      message: getMessage("default.badRequest"),
      metadata: req.new_token,
    });
  }
}

async function currentPrice(req: Request, res: Response) {
  try {
    const [response1, response2, response3] = await Promise.all([
      axios.get(url + USD + "-" + BRL),
      axios.get(url2),
      axios.get(url3),
    ]);

    const currencies = [
      {
        name: USD + "/" + BRL,
        code: response1.data[0].code,
        codein: response1.data[0].codein,
        bid: response1.data[0].bid,
      },
      {
        name: BTC + "/" + EUR,
        code: BTC,
        codein: EUR,
        bid: response2.data.result.XXBTZEUR.a[0],
      },
      {
        name: BTC + "/" + USD,
        code: BTC,
        codein: USD,
        bid: response3.data.result.XXBTZUSD.a[0],
      },
    ];

    return res.status(200).json({
      data: currencies,
      message: getMessage("currency.current.prices"),
      metadata: req.new_token,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
      message: getMessage("default.badRequest"),
      metadata: req.new_token,
    });
  }
}

async function getCurrency(req: Request, res: Response) {
  const { currency } = req.query;

  try {
    const { data } = await axios.get(`${url}last/${currency}`);
    return res.status(200).json({
      data,
      message: getMessage("currency.get.price"),
      metadata: req.new_token,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
      message: getMessage("default.badRequest"),
      metadata: req.new_token,
    });
  }
}

export default { getCurrency, currentPrice, latelyPrice };
