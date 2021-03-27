import { Router } from "express";
import { bebida } from "./BebidaRoute";
import { cliente } from "./ClienteRoute";
import { endereco } from "./EnderecoRoute";
import { favorito } from "./FavoritoRoute";
import { health } from "./HealthRoute";
import { ingrediente } from "./IngredienteRoute";
import { login } from "./LoginRoute";
import { pedido } from "./PedidoRoute";
import { pizza } from "./PizzaRoute";

const routes = Router();

routes.use("/health", health);
routes.use("/pizzas", pizza);
routes.use("/bebidas", bebida);
routes.use("/ingredientes", ingrediente);
routes.use("/clientes", cliente);
routes.use("/login", login);
routes.use("/enderecos", endereco);
routes.use("/favoritos", favorito);
routes.use("/pedidos", pedido);

export { routes };
