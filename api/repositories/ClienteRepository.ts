import { EntityRepository, Repository } from "typeorm";
import { Cliente } from "../models/Cliente";

@EntityRepository(Cliente)
class ClienteRepository extends Repository<Cliente> {}

export { ClienteRepository };
