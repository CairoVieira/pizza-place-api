import { EntityRepository, Repository } from "typeorm";
import { Pizza } from "../models/Pizza";

@EntityRepository(Pizza)
class PizzaRepository extends Repository<Pizza> {}

export { PizzaRepository };
