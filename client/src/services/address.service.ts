import axios from 'axios';
import IAddress from '@/interfaces/address.interface';

class AddressService {
  public async getAddress(cepMasked: string): Promise<IAddress> {
    const cep = cepMasked.replace('.', '').replace('-', '');

    const baseURL = `https://viacep.com.br/ws/${cep}/json/`;

    const { data } = await axios.get(baseURL);

    const address = {
      publicPlace: data.logradouro,
      district: data.bairro,
      city: data.localidade,
      state: data.uf,
    };

    return address;
  }
}

export default new AddressService();
