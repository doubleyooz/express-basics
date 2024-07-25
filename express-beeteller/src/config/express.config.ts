import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import corsOptions from "./cors.config";

import * as swaggerDocument from "../config/swagger.json";

import appRoute from "../routes/app.route";
import authRoute from "../routes/auth.route";
import userRoute from "../routes/user.route";
import currencyRoute from "../routes/currency.route";

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
//app.use(cors());
app.use(cors(corsOptions));
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(appRoute);
app.use(authRoute);
app.use(userRoute);
app.use(currencyRoute);

export { app };
