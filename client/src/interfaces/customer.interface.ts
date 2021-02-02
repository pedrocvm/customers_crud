export default interface ICustomer {
  name: String;
  cpf: String;
  address: {
    cep: String;
    publicPlace: String;
    number: String;
    district: String;
    city: String;
    state: String;
  };
  contact: {
    phone: String;
    email: String;
  };
  dependents?: []
}
