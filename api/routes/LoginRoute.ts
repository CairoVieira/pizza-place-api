import { Request, Response, Router } from "express";
import { LoginController } from "../controllers/LoginController";
import { Login } from "../models/Login";

const login = Router();
const loginController = new LoginController();

login.put("/", async (request: Request, response: Response) => {
    const { email, senha, cliente_id } = request.body;

    const result = await loginController.atualizar(senha, cliente_id, email);

    if (!(result instanceof Login)) {
        return response.status(500).json(result);
    }
    return response.status(201).json(result);
});

export { login };
