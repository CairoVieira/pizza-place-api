import { EntityRepository, Repository } from "typeorm";
import { Ingrediente } from "../models/Ingrediente";

@EntityRepository(Ingrediente)
class IngredienteRepository extends Repository<Ingrediente> {}

export { IngredienteRepository };
