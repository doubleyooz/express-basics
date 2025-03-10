import "dotenv/config";
import http from "http";
import mongoose from "mongoose";
import { app } from "./config/express.config";

mongoose.connect(`${process.env.DB_CONNECTION}`);


const server = new http.Server(app);

const PORT: number = parseInt(process.env.PORT as string, 10);
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
