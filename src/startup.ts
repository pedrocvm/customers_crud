import API from './api';
import { databaseConnect } from './database';

const api = new API();

const environment = process.env.NODE_ENV.toUpperCase();

const startup = async () => {
  console.info(`Using Environment: ${environment}`);
  console.info(`Process ID: ${process.pid}`);

  console.info('Starting Database...');

  try {
    await databaseConnect();
  } catch (err) {
    console.log(err.message);
  }

  console.info('Starting API...');
  api.start();
};

(async () => {
  try {
    await startup();
  } catch (err) {
    console.error('Error in API Connection: ', err.message);
    process.exit(1);
  }
})();
