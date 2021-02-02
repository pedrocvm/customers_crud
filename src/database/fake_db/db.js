const mongoose = require('mongoose');
const config = require('config');
const { CustomerModel, DependentModel } = require('./schema');
const { fake_customers, fake_dependents } = require('./base');

const dbConfig = config.get('app.database');

(async () => {
  try {
    await mongoose.connect(dbConfig.get('mongoUrl'), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB Connection Success.');
  } catch (err) {
    console.error({ Error: err.message });
  }
})();

(async () => {
  await CustomerModel.deleteMany({});
  await CustomerModel.insertMany(fake_customers);

  console.log('FAKE CUSTOMERS GENERATED...');
  console.log(fake_customers);
})();

(async () => {
  await DependentModel.deleteMany({});
  await DependentModel.insertMany(fake_dependents);
  
  fake_dependents.forEach(async (dependent) => {
    await CustomerModel.findOneAndUpdate(
      { _id: dependent.maintainer }, 
      { $push: { dependents: dependent } }, 
      {
        new: true,
        useFindAndModify: false,
      }).populate('dependents');
  })

  console.log('FAKE DEPENDENTS GENERATED...');
  console.log(fake_dependents);
  
  setTimeout(() => {
    mongoose.connection.close();
  }, 2000);
  
})();
