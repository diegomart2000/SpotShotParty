const sequelize = require('../../model/database');
const Pair = require('../../model/Pair');

describe('Pair', () => {
  const companyId = 1;
  const personAId = 1;
  const personBId = 1;

  const pair = {
    companyId,
    personAId,
    personBId,
    details: null,
    score: 0.12
  };

  before(done => {
    sequelize
      .query('DELETE FROM pairs WHERE company_id=:companyId ', { replacements: {companyId}})
      .then(() => done());
  });

  it('should create a Pair', done => {
    Pair
      .create(pair)
      .then(created => {
        const createdCompanyId = created.get('companyId');
        expect(createdCompanyId).to.be.equal(companyId);
      })

      .then(done);
  });

  it('should list persisted Pair by company id', done => {
    Pair
      .findAll({where: {companyId}})
      .then(list => {
        expect(list).to.be.an('array');
        expect(list.length).to.be.gt(0);
      })
      .then(done);
  });

  it('should get a persisted Pair by person id', done => {

    Pair
      .findAll({ where: { companyId, personAId } })
      .then(list => {
        expect(list).to.be.an('array');
        expect(list.length).to.be.gt(0);
      })
      .then(done);
  });

});
