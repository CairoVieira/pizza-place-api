import { EntityRepository, Repository } from "typeorm";
import { ItensPizza } from "../models/ItensPizza";

@EntityRepository(ItensPizza)
class ItensPizzaRepository extends Repository<ItensPizza> {}

export { ItensPizzaRepository };
