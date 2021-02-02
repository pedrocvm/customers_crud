import IDependent from '@/interfaces/dependent.interface';
import axios from 'axios';

const baseURL = 'http://localhost:3341/dependent';

class DependentService {
  public async createDependent(
    customerID: string,
    newDependent: any
  ): Promise<IDependent> {
    const { data } = await axios.post(`${baseURL}/${customerID}`, newDependent);

    return data;
  }

  public async updateDependent(
    customerID: string,
    id: string,
    newDependent: any
  ): Promise<any> {
    const { data } = await axios.patch(
      `${baseURL}/${customerID}/${id}`,
      newDependent
    );

    return data;
  }

  public async deleteDependent(customerID: string, id: string): Promise<void> {
    
    const { data } = await axios.delete(`${baseURL}/${customerID}/${id}`);

    return data;
  }
}

export default new DependentService();
