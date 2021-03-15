import { EntityRepository, Repository } from "typeorm";
import { Bebida } from "../models/Bebida";

@EntityRepository(Bebida)
class BebidaRepository extends Repository<Bebida> {}

export { BebidaRepository };
