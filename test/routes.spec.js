const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const server = `http://localhost:3342`;

chai.should();
chai.use(chaiHttp);

const customer = {
  _id: '601482fd67e11a3834541bdd',
  name: 'cliente teste',
  cpf: '12312312312',
  address: {
    cep: '53427000',
    publicPlace: 'av. teste',
    number: '1123',
    district: 'conceição',
    city: 'paulista',
    state: 'PE',
  },
  contact: {
    phone: '81998100062',
    email: 'pedrocvm@gmail.com',
  },
  dependents: [],
};

const dependent = {
  _id: '6014843d67e11a3834541bde',
  maintainer: '601482fd67e11a3834541bdd',
  name: 'dependente teste',
  cpf: '32132132132',
  age: 12,
  type: 'filho',
};

describe('Vehicles API', () => {
  // POST
  describe('POST /customer', () => {
    it('It should CREATE a Customer', (done) => {
      chai
        .request(server)
        .post('/customer')
        .send(customer)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  // GET
  describe('GET /customer', () => {
    it('It should GET all the Customers', (done) => {
      chai
        .request(server)
        .get('/customer')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.eql(1);
          expect(res.body[0]).to.eql(customer);
          done();
        });
    });
  });

  // GET BY ID
  describe('GET /customer by ID', () => {
    it('It should GET a Specific Customer', (done) => {
      chai
        .request(server)
        .get(`/customer/${customer._id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.eql(customer);
          done();
        });
    });
  });

  // PATCH
  describe('PATCH /customer', () => {
    it('It should UPDATE a Customer', (done) => {
      chai
        .request(server)
        .patch(`/customer/${customer._id}`)
        .send({ name: 'Cliente Teste 2' })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.a('object');
          expect(res.body.name).to.not.eql(customer.name);
          done();
        });
    });
  });

  // CREATE DEPENDENT
  describe('POST /dependent', () => {
    it('It should CREATE a Dependent', (done) => {
      chai
        .request(server)
        .post(`/dependent/${customer._id}`)
        .send(dependent)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  // GET ALL DEPENDENTS REGARDLESS CUSTOMER ID
  describe('GET /customer', () => {
    it('It should GET all the Dependents', (done) => {
      chai
        .request(server)
        .get('/dependent')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.eql(1);
          expect(res.body[0]).to.eql(dependent);
          done();
        });
    });
  });

  // GET ALL DEPENDENTS BELONGING TO A CUSTOMER BY CUSTOMER ID
  describe('GET /customer by ID', () => {
    it('It should GET All Dependents belonging to a Customer', (done) => {
      chai
        .request(server)
        .get(`/dependent/${customer._id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.eql(1);
          expect(res.body[0]).to.eql(dependent);
          done();
        });
    });
  });

  // UPDATE DEPENDENT
  describe('PATCH /dependent', () => {
    it('It should UPDATE a Dependent', (done) => {
      chai
        .request(server)
        .patch(`/dependent/${customer._id}/${dependent._id}`)
        .send({ name: 'Dependente Teste 2' })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.a('object');
          expect(res.body.name).to.not.eql(dependent.name);
          done();
        });
    });
  });

  // DELETE DEPENDENT
  describe('DELETE /dependent', () => {
    it('It should DELETE a Dependent', (done) => {
      chai
        .request(server)
        .delete(`/dependent/${customer._id}/${dependent._id}`)
        .end((err, res) => {
          done();
        });
    });
  });

  // DELETE CUSTOMER
  describe('DELETE /customer', () => {
    it('It should DELETE a Customer', (done) => {
      chai
        .request(server)
        .delete(`/customer/${customer._id}`)
        .end((err, res) => {
          done();
        });
    });
  });
});
