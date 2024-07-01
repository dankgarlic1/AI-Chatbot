"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connection_1 = require("./db/connection");
const port = process.env.PORT || 5000;
//only listen to port 3000 when successfully connected to the database
(0, connection_1.connectToDatabase)()
    .then(() => {
    app_1.default.listen(port, () => console.log(`App running on PORT NUMBER ${port}`));
})
    .catch((err) => console.log(err));
