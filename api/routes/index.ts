import { Router } from "express";
import { health } from "./HealthRoute";
import { pizza } from "./PizzaRoute";
import { bebida } from "./BebidaRoute";

const routes = Router();

routes.use("/health", health);
routes.use("/pizza", pizza);
routes.use("/bebida", bebida);

export { routes };
