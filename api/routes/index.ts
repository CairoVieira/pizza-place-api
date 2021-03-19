import { Router } from "express";
import { health } from "./HealthRoute";
import { pizza } from "./PizzaRoute";
import { bebida } from "./BebidaRoute";
import { ingrediente } from "./IngredienteRoute";
import { cliente } from "./ClienteRoute";

const routes = Router();

routes.use("/health", health);
routes.use("/pizzas", pizza);
routes.use("/bebidas", bebida);
routes.use("/ingredientes", ingrediente);
routes.use("/clientes", cliente);

export { routes };
