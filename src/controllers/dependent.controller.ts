import { Request, Response, Router } from 'express';
import DependentService from '../services/dependent.service';

const router = Router();
const dependentService = new DependentService();
const controllerName = '/dependent';

router.get(controllerName, async (_, res: Response) => {
  //prettier-ignore
  try {
    const allDependents = await dependentService.getAllDependents();
    return res.status(200).send(allDependents);
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
      const dependent = await dependentService.getDependentByID(id);
      return res.status(200).send(dependent);
    } 
    catch (err) {
      console.error({ error: err.message });
      return res.status(400).send({ error: err.message });
    }
});

router.post(
  `${controllerName}/:customerID`,
  async (req: Request, res: Response) => {
    //prettier-ignore
    try {
    const newDependent = await dependentService.createNewDependent(
      req.body,
      req.params.customerID
    );
    return res.status(201).send(newDependent);
  } 
  catch (err) {
    console.error({ error: err.message });
    return res.status(400).send({ error: err.message });
  }
  }
);

router.patch(
  `${controllerName}/:customerID/:id`,
  async (req: Request, res: Response) => {
    //prettier-ignore
    try {
    const { id } = req.params;
    const updatedDependent = await dependentService.updateDependent(
      req.body,
      id 
    );
    return res.status(201).send(updatedDependent);
  } 
  catch (err) {
    console.error({ error: err.message });
    return res.status(400).send({ error: err.message });
  }
  }
);

router.delete(
  `${controllerName}/:customerID/:id`,
  async (req: Request, res: Response) => {
    //prettier-ignore
    try{
      const { id } = req.params;
      await dependentService.deleteDependent(id);
      return res.status(200).end();
    }
    catch(err){
      console.error({error: err.message});
      return res.status(400).send({ error: err.message });
    }
  }
);

export default router;
