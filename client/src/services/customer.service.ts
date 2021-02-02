import ICustomer from '@/interfaces/customer.interface';
import axios from 'axios';

const baseURL = 'http://localhost:3341/customer';

class CustomerService {
  public async createCustomer(newCustomer: any): Promise<ICustomer> {
    const { data } = await axios.post(baseURL, newCustomer);

    return data;
  }

  public async updateCustomer(id: string, newCustomer: any): Promise<any> {
    const { data } = await axios.patch(`${baseURL}/${id}`, newCustomer);

    return data;
  }

  public async deleteCustomer(id: string): Promise<void> {
    const { data } = await axios.delete(`${baseURL}/${id}`);

    return data;
  }
}

export default new CustomerService();
