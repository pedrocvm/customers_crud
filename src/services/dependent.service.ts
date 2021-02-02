import DependentModel from '../models/dependent.model';
import CustomerModel from '../models/customer.model';
import IDependent from '../interfaces/dependent.interface';
import ICustomer from '../interfaces/customer.interface';

export default class CustomerService {
  public async getAllDependents(): Promise<IDependent[]> {
    const allDependents: IDependent[] = await DependentModel.find();
    return allDependents;
  }

  public async getDependentByID(_id: string): Promise<IDependent[]> {
    const dependent: IDependent[] = await DependentModel.find({
      maintainer: _id,
    });
    return dependent;
  }

  public async createNewDependent(
    dependent: IDependent,
    customerID: String
  ): Promise<any> {
    //prettier-ignore
    try {
      const hasDependent: IDependent = await DependentModel.findOne({
        cpf: dependent.cpf,
      });
      const hasMaintainer = await CustomerModel.findOne({ _id: customerID });
  
      if (hasDependent) {
        throw new Error('Dependent already registered.');
      }
  
      if(!hasMaintainer){
        throw new Error('Customer Maintainer not found.');
      }

      dependent.maintainer = customerID;
      const newDependent = await DependentModel.create(dependent);
      
      await CustomerModel.findOneAndUpdate(
        { _id: customerID }, 
        { $push: { dependents: newDependent } }, 
        {
          new: true,
          useFindAndModify: false,
        }).populate('dependents');
      
      return newDependent;
    } 
    catch (err) {
      console.error(err.message);
      throw new Error(err.message);
    }
  }

  public async updateDependent(
    dependent: IDependent,
    _id: String
  ): Promise<IDependent> {
    //prettier-ignore
    try {
      const oldDependent: ICustomer = await DependentModel.findOne({
        _id,
      });
  
      if (!oldDependent) {
        throw new Error('Dependent not found.');
      }
  
      const DependentUpdated = await DependentModel.findOneAndUpdate(
        { _id },
        { $set: { ...dependent } },
        {
          new: true,
          useFindAndModify: false,
        }
      );
  
      return DependentUpdated;
    } 
    catch(err) {
      console.error(err.message);
      throw new Error(err.message);
    }
  }

  public async deleteDependent(_id: String): Promise<void> {
    const hasDependent = await DependentModel.findOne({ _id });

    if (!hasDependent) {
      throw new Error('Dependent not found.');
    }

    await DependentModel.findByIdAndRemove(
      { _id },
      { useFindAndModify: false }
    );
  }
}
