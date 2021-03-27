import { EntityRepository, Repository } from "typeorm";
import { Pedido } from "../models/Pedido";

@EntityRepository(Pedido)
class PedidoRepository extends Repository<Pedido> {}

export { PedidoRepository };
