import "dotenv/config";
import http from "http";

import { app } from './config/express.config';

const server = http.Server(app);

const PORT: number = parseInt(process.env.PORT || '3000', 10);
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
