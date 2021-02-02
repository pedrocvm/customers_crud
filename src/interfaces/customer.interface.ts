import IDependent from './dependent.interface';

export default interface ICustomer {
  name: String;
  cpf: String;
  address: {
    cep: String;
    e: String;
    number: Number;
    district: String;
    city: String;
    state: String;
  },
  contact: {
    phone: String;
    email: String;
  };
  dependents: IDependent[];
}
