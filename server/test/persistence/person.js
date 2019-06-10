const sequelize = require('../../model/database');
const Person = require('../../model/Person');

describe('Person', () => {
  const companyId = 1;
  let id = null;
  const person = {
    companyId,
    fullName: 'Diego',
    email: 'diego@jam.com',
    details: {
      interests: ['x', 'y', 'z']
    }
  };

  before(done => {
    sequelize
      .query('DELETE FROM persons WHERE company_id=:companyId ', { replacements: {companyId}})
      .then(() => done());
  });

  it('should create a Person', done => {
    Person
      .create(person)
      .then(created => {
        const createdId = id = created.get('id');
        const details = created.get('details');
        const createdCompanyId = created.get('companyId');

        expect(createdId).to.be.a('number');
        expect(details).to.be.an('object');
        expect(JSON.stringify(details)).to.be.equal(JSON.stringify(person.details));
        expect(createdCompanyId).to.be.equal(companyId);
      })

      .then(done);
  });

  it('should list persisted Person by company id', done => {
    Person
      .findAll({where: {companyId}})
      .then(list => {
        expect(list).to.be.an('array');
        expect(list.length).to.be.gt(0);
      })
      .then(done);
  });

  it('should get a persisted Person by id', done => {

    Person
      .findByPk(id)
      .then(found => {
        expect(found).to.be.an('object');
        expect(found.get('companyId')).to.be.equal(companyId);
        expect(found.get('fullName')).to.be.equal(person.fullName);
      })
      .then(done);
  });

  it('should delete a persisted Person by id', done => {

    Person
      .findByPk(id)
      .then(found => found.destroy())
      .then(() => Person.findByPk(id))
      .then(found => {
        expect(found).to.be.a('null');
      })
      .then(done);
  });

});
