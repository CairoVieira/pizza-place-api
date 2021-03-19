import { EntityRepository, Repository } from "typeorm";
import { Endereco } from "../models/Endereco";

@EntityRepository(Endereco)
class EnderecoRepository extends Repository<Endereco> {}

export { EnderecoRepository };
