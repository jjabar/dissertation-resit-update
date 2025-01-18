import http from "http"
import dbConnection from "./config/dbConnection.js";
import startConsumer from "./kafka/consumer.js";
import app from "./app/app.js";

dbConnection();
startConsumer(); 

const PORT = process.env.PORT || 8000;
const server = http.createServer(app)

server.listen(PORT, () => console.log(`app listening at port ${PORT}`));