import { EntityRepository, Repository } from "typeorm";
import { Favorito } from "../models/Favorito";

@EntityRepository(Favorito)
class FavoritoRepository extends Repository<Favorito> {}

export { FavoritoRepository };
