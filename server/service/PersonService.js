const Person = require('../model/Person');
const ScoreService = require('../service/ScoreService');

// To get a list of people by companyId
module.exports.list = async (companyId) => {
  try {

    let people = await Person.findAll({ where: { companyId } });
    return people;

  } catch (error) {
    console.error(`PersonService : Error while loading people for ${companyId}`, error);
    throw error;
  }
};

/**
 * To get a person by company id and person id
 * @param {int} companyId
 * @param {int} personId
 */
module.exports.get = async (companyId, personId) => {
  if (!companyId) throw new Error(`Company id and Person id are required. Got c:${companyId} p:${personId}`);

  try {

    let where = {
      id: personId,
      companyId,
    };

    let person = await Person.findOne({ where });
    let pairs = await ScoreService.list(companyId, personId);

    return person.setPairs(pairs);

  } catch (error) {
    console.error(`PersonService : Error while loading people for ${companyId}`, error);
    throw error;
  }
};

// To get a create of people by companyId
module.exports.create = async (companyId, person) => {
  try {
    const to = {
      ...person,
      companyId,
    };

    return await Person.create(to);

  } catch (error) {
    console.error(`PersonService : Error while loading people for ${companyId}`, error);
    throw error;
  }
};
