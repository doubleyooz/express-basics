import "dotenv/config";
import http from "http";

import { app } from "./config/express.config.js";

mongoose.connect(`${process.env.DB_CONNECTION}`);
const server = http.Server(app);

const PORT = parseInt(process.env.PORT, 10);
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});