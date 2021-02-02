import ICustomer from './customer.interface';

export default interface IDependent {
  maintainer: String;
  _id: String;
  name: String;
  cpf: String;
  age: Number;
  type: String;
}