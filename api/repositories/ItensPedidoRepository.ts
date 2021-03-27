import { EntityRepository, Repository } from "typeorm";
import { ItensPedido } from "../models/ItensPedido";

@EntityRepository(ItensPedido)
class ItensPedidoRepository extends Repository<ItensPedido> {}

export { ItensPedidoRepository };
