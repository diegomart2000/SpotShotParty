const sequelize = require('../../model/database');
const ingest = require('../../fixtures/ingest_responses');
const ScoreService = require('../../service/ScoreService');
const PersonService = require('../../service/PersonService');
const CompanyService = require('../../service/CompanyService');
const RuleService = require('../../service/RuleService');

const Rule = require('../../model/rules/Rule');
const Premise = require('../../model/rules/Premise');

const _ = require('lodash');

describe('Scoring Service', () => {
  const companyId = 1;

  // Let's populate the database
  before(async () => {
    await sequelize
      .query('DELETE FROM persons WHERE company_id=:companyId ', { replacements: { companyId } });

    await sequelize
      .query('DELETE FROM rules WHERE company_id=:companyId ', { replacements: { companyId } });

    await sequelize
      .query('DELETE FROM companies WHERE id=:companyId ', { replacements: { companyId } });

    // Create Company
    // Create Rules
    // Create people

    await CompanyService.create({ id: companyId, name: 'Big Company Co.', details: {}});

    let people = await ingest();

    // Make them Person
    people = people.map(p => {
      const { fullName, email, ...details } = p;
      const person = {
        fullName,
        email,
        details
      };

      return PersonService.create(companyId, person);
    });

    await Promise.all(people);

    let rules = createRules();

    return RuleService.create(companyId, rules);
  });

  beforeEach(async () => {
    await ScoreService.clear(companyId);
  });

  it('should score persons based on a ruleset', async () => {
    const pairs = await ScoreService.scorePairs(companyId);
    console.log(pairs);
  });

  it('should score persons in a deterministic way based on same ruleset', async () => {
    const pairsA = await ScoreService.scorePairs(companyId);

    const sampleA = _(Array.from(pairsA.values()))
      .sortBy('score')
      .reverse()
      .head();

    await ScoreService.clear(companyId);

    const pairsB = await ScoreService.scorePairs(companyId);
    const sampleB = pairsB.get(`${sampleA.personAId}-${sampleA.personBId}`);

    expect(sampleA.score).to.be.eq(sampleB.score);

    return;
  });
});

const createRules = () => [

  // 1- Development to Quality
  {
    name: 'Development to Quality',
    ruleOrder: 50,
    ruleSet: Rule
      .of('or')

      // Dev to Qa
      .append(
        Rule
          .of('and')

          .append(
            Premise
              .is('//personA.details.department')
              .eq
              .to('Developer')
          )

          .append(
            Premise
              .is('//personB.details.department')
              .eq
              .to('Quality')
          )
      )

      // Qa to Dev
      .append(
        Rule
          .of('and')

          .append(
            Premise
              .is('//personA.details.department')
              .eq
              .to('Quality')
          )

          .append(
            Premise
              .is('//personB.details.department')
              .eq
              .to('Developer')
          )
      ),
  },


  // Favorite interest is part of person b interests
  {
    name: 'Favorite interest',
    ruleOrder: 20,
    ruleSet: Rule
      .of('or')
      .append(
        Premise
          .is('//personB.details.interestsPersonal')
          .contains
          .to('//personA.details.favoriteInterest')
      )
      .append(
        Premise
          .is('//personA.details.interestsPersonal')
          .contains
          .to('//personB.details.favoriteInterest')
      ),
  },

  // Email is part of interested emails
  {
    name: 'Email is part of interested emails',
    ruleOrder: 10,
    ruleSet: Rule
      .of('or')
      .append(
        Premise
          .is('//personB.email')
          .contains
          .to('//personA.details.interestedEmails')
      )
  },

];
