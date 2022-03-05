import { uuid } from "uuidv4";
import { User } from "../../entities/User";
import { MailProvider } from "../../providers/MailProvider";
import { UsersRepository } from "../../repositories/UsersRepository";
import { CreateUserRequestDTO } from "./CreateUserDTO";

class CreateUserUserCase {
  constructor(
    private usersRepository: UsersRepository,
    private mailProvider: MailProvider
  ) {}
  async execute(data: CreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }
    const user = new User(data);
    await this.usersRepository.save(user);
    await this.mailProvider.sendEmailToUser({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Equipe Aguiar",
        email: "felipeferreiraaguiar9@gmail.com",
      },
      body: "<p>Você já pode fazer login em nossa plataforma</p>",
      subject: "Bem-vindo à plataforma",
    });
  }
}
export { CreateUserUserCase };
