import btoa from "btoa";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { LoginRepository } from "../repositories/LoginRepository";

class LoginController {
    async atualizar(senha: string, cliente_id: string, email: string) {
        try {
            const login = yup.object().shape({
                senha: yup.string().required("Senha é obrigatório"),
                cliente_id: yup.string().required("ID é obrigatório"),
                email: yup.string().uppercase().required("Email é obrigatório"),
            });

            await login.validate({ senha, cliente_id, email });

            const loginRepository = getCustomRepository(LoginRepository);

            const loginUpdated = await loginRepository.findOne({
                where: { cliente_id: cliente_id },
            });

            if (!loginUpdated) {
                return { error: "Cliente não existe" };
            }

            const senhaCripto = btoa("Zap_" + senha + "_ata");

            const loginCreated = loginRepository.create({
                email: loginUpdated.email.toLowerCase(),
                senha: senhaCripto,
                cliente_id: cliente_id,
                updated_at: new Date(),
            });
            await loginRepository.save(loginCreated);

            return loginCreated;
        } catch (err) {
            return { error: err.message };
        }
    }
}

export { LoginController };
