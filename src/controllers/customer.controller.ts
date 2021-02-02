import { Request, Response, Router } from 'express';
import CustomerService from '../services/customer.service';

const router = Router();
const customerService = new CustomerService();
const controllerName = '/customer';

router.get('/', (_, res: Response) => {
  res.send({
    message:
      'Welcome to Triyo Challenge API. Request to /customer to consume our Web Service, or /doc to access our documentation.',
  });
});

router.get(controllerName, async (_, res: Response) => {
  //prettier-ignore
  try {
    const allCustomers = await customerService.getAllCustomers();
    return res.status(200).send(allCustomers);
  }
  catch (err) {
    console.error({ error: err.message });
    return res.status(400).send({ error: err.message });
  }
});

router.get(`${controllerName}/:id`, async (req: Request, res: Response) => {
  //prettier-ignore
  try {
      const {id} = req.params;
      const customer = await customerService.getCustomerByID(id);
      return res.status(200).send(customer);
    } 
    catch (err) {
      console.error({ error: err.message });
      return res.status(400).send({ error: err.message });
    }
});

router.post(controllerName, async (req: Request, res: Response) => {
  //prettier-ignore
  try {
    const newCustomer = await customerService.createNewCustomer(req.body);
    return res.status(201).send(newCustomer);
  } 
  catch (err) {
    console.error({ error: err.message });
    return res.status(400).send({ error: err.message });
  }
});

router.patch(`${controllerName}/:id`, async (req: Request, res: Response) => {
  //prettier-ignore
  try {
    const { id } = req.params;
    const updatedCustomer = await customerService.updateCustomer(id, req.body);
    return res.status(201).send(updatedCustomer);
  } 
  catch (err) {
    console.error({ error: err.message });
    return res.status(400).send({ error: err.message });
  }
});

router.delete(`${controllerName}/:id`, async (req: Request, res: Response) => {
  //prettier-ignore
  try{
      const {id} = req.params;
      await customerService.deleteCustomer(id);
      return res.status(200).end();
    }
    catch(err){
      console.error({error: err.message});
      return res.status(400).send({ error: err.message });
    }
});

router.delete('/clear', async (req: Request, res: Response) => {
  //prettier-ignore
  try{
      await customerService.clearDB();
      return res.status(200).end();
    }
    catch(err){
      console.error({error: err.message});
      return res.status(400).send({ error: err.message });
    }
});

export default router;
