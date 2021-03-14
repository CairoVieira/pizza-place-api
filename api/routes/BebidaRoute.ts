import { Router, Request, Response } from "express";
import { BebidaController } from "../controllers/BebidaController";

const bebida = Router();
const bebidaController = new BebidaController();

bebida.get("/", bebidaController.listar);

export { bebida };
