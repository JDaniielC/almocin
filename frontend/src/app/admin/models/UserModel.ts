export default interface UserModel {
  id: string;
  name: string;
  email: string;
  gender: string;
  cpf: string;
  cep: string;
  password: string;
  paymentMethod: string;
  recoveryQuestion: string;
}