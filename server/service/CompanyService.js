const Company = require('../model/Company');

// To get a list of companies
module.exports.list = async () => {
  try {

    let companies = await Company.findAll();
    return companies;

  } catch (error) {
    console.error(`CompanyService : Error while loading companies`, error);
    throw error;
  }
};

/**
 * To get a Company by company id
 * @param {int} companyId
 */
module.exports.get = async (companyId) => {
  if (!companyId) throw new Error(`Company id is e required. Got c:${companyId}`);

  try {
    return await Company.findByPk(companyId);
  } catch (error) {
    console.error(`CompanyService : Error while loading companies for ${companyId}`, error);
    throw error;
  }
};

// To create a company
module.exports.create = async (company) => {
  try {

    // TODO: Validate input values
    return await Company.create(company);

  } catch (error) {
    console.error(`CompanyService : Error while creating company`, company, error);
    throw error;
  }
};
