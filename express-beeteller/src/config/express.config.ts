import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import corsOptions from "./cors.config";

import appRoute from "../routes/app.route";
//import authRoute from "../routes/auth.route";
//import userRoute from "../routes/user.route";
//import currencyRoute from "../routes/currency.route";

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
//app.use(cors());
app.use(cors(corsOptions));

app.use(appRoute);
//app.use(authRoute);
//app.use(userRoute);
//app.use(currencyRoute);

export { app };
