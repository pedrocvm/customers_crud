import CustomerModel from '../models/customer.model';
import DependentModel from '../models/dependent.model';
import ICustomer from '../interfaces/customer.interface';

export default class CustomerService {
  public async getAllCustomers(): Promise<ICustomer[]> {
    const allCustomers: ICustomer[] = await CustomerModel.find().populate(
      'dependents'
    );
    return allCustomers;
  }

  public async getCustomerByID(_id: string): Promise<ICustomer> {
    const customer: ICustomer = await CustomerModel.findOne({ _id }).populate(
      'dependents'
    );
    return customer;
  }

  public async createNewCustomer(customer: ICustomer): Promise<any> {
    const hasCustomer: ICustomer = await CustomerModel.findOne({
      cpf: customer.cpf,
    });

    if (hasCustomer) {
      throw new Error('Customer already registered.');
    }

    const newCustomer = await CustomerModel.create(customer);

    return newCustomer;
  }

  public async updateCustomer(
    _id: string,
    newCustomer: ICustomer
  ): Promise<any> {
    const customer: ICustomer = await CustomerModel.findOne({ _id });

    if (!customer) {
      throw new Error('Customer not found.');
    }

    const CustomerUpdated = await CustomerModel.findOneAndUpdate(
      { _id },
      newCustomer,
      {
        new: true,
        useFindAndModify: false,
      }
    );

    return CustomerUpdated;
  }

  public async deleteCustomer(_id: string): Promise<void> {
    const hasCustomer = await CustomerModel.findOne({ _id });

    if (!hasCustomer) {
      throw new Error('Customer not found.');
    }

    await DependentModel.deleteMany(
      { maintainer: _id },
      { useFindAndModify: false }
    );
    await CustomerModel.findByIdAndRemove({ _id }, { useFindAndModify: false });
  }

  public async clearDB(): Promise<void> {
    await CustomerModel.deleteMany({});
    await DependentModel.deleteMany({});
  }
}
