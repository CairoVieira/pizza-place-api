import { EntityRepository, Repository } from "typeorm";
import { Login } from "../models/Login";

@EntityRepository(Login)
class LoginRepository extends Repository<Login> {}

export { LoginRepository };
