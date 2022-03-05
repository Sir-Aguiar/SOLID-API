import { Request, Response } from "express";
import { CreateUserUserCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUserCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password,
      });
      return res.status(201).send();
    } catch (e) {
      return res.status(400).json({
        message: e.message || "Unexpected error.",
      });
    }
  }
}
export { CreateUserController };
