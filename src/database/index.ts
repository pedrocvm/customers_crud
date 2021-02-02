import { get, IConfig } from 'config';
import {connect, connection} from 'mongoose';

const dbConfig: IConfig = get('app.database');

export const databaseConnect = async () => {
  try {
    await connect(dbConfig.get('mongoUrl'), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB Connection Success.');
  } catch (err) {
    console.error({ Error: err.message });
  }
};

export const databaseClose = (): Promise<void> => connection.close();