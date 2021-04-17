import "reflect-metadata";
import createConnection from "./database";
import express from "express";
import { routes } from "./routes";
import cors from "cors";

createConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

export { app };
