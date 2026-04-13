import dotenv from "dotenv";
import http from "http";
import app from "./index.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});