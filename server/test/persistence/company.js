const sequelize = require('../../model/database');
const Company = require('../../model/Company');

describe('Company', () => {
  let id = 1;
  const company = {
    id,
    name: 'Diego\'s big co',
    details: {
      departments: ['x', 'y', 'z']
    }
  };

  before(done => {
    sequelize
      .query('DELETE FROM companies WHERE id=:id ', { replacements: {id}})
      .then(() => done());
  });

  it('should create a Company', done => {
    Company
      .create(company)
      .then(created => {
        const createdId = id = created.get('id');
        const details = created.get('details');

        expect(createdId).to.be.a('number');
        expect(details).to.be.an('object');
        expect(JSON.stringify(details)).to.be.equal(JSON.stringify(company.details));
        expect(createdId).to.be.equal(id);
      })

      .then(done);
  });

  it('should get a persisted Company by id', done => {

    Company
      .findByPk(id)
      .then(found => {
        expect(found).to.be.an('object');
        expect(found.get('id')).to.be.equal(id);
        expect(found.get('name')).to.be.equal(company.name);
      })
      .then(done);
  });

  it('should delete a persisted Company by id', done => {

    Company
      .findByPk(id)
      .then(found => found.destroy())
      .then(() => Company.findByPk(id))
      .then(found => {
        expect(found).to.be.a('null');
      })
      .then(done);
  });

});
