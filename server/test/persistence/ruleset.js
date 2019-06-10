const sequelize = require('../../model/database');
const Ruleset = require('../../model/RuleSet');
const Rule = require('../../model/rules/Rule');
const Premise = require('../../model/rules/Premise');

describe('Ruleset', () => {
  const companyId = 1;
  const ruleOrder = 1;
  let id = null;

  before(done => {
    sequelize
      .query('DELETE FROM rules WHERE company_id=:companyId ', { replacements: {companyId}})
      .then(() => done());
  });

  it('should create a Ruleset', done => {
    const rule = {
      companyId,
      ruleOrder,
      ruleSet: complexRule().toJSON()
    };

    Ruleset
      .create(rule)
      .then(created => {
        const createdId = id = created.get('id');
        const createdRuleSet = created.get('ruleSet');
        const createdCompanyId = created.get('companyId');

        expect(createdId).to.be.a('number');
        expect(createdRuleSet).to.be.an('object');
        expect(JSON.stringify(createdRuleSet)).to.be.equal(JSON.stringify(rule.ruleSet));
        expect(createdCompanyId).to.be.equal(companyId);
      })

      .then(done);
  });

  it('should list persisted Ruleset by company id', done => {
    Ruleset
      .findAll({where: {companyId}})
      .then(list => {
        expect(list).to.be.an('array');
        expect(list.length).to.be.gt(0);
      })
      .then(done);
  });

  it('should get a persisted Ruleset by id', done => {
    const personA = {
      age: 30,
      name: 'Diego',
      location: {
        id: 1,
        name: 'Philly'
      }
    };

    const personB = {
      age: 9,
      name: 'Alexia',
      location: {
        id: 1,
        name: 'NYC'
      }
    };

    const pair = {
      personA,
      personB,
    };

    Ruleset
      .findByPk(id)
      .then(ruleset => {
        expect(ruleset).to.be.an('object');
        expect(ruleset.get('companyId')).to.be.equal(companyId);

        // Persisted ruleset should be reverted back
        const rule = ruleset.getRules();
        expect(rule instanceof Rule).to.be.true;
        expect(rule.eval(pair)).to.be.equal(1);
      })
      .then(done)
      .catch(done);
  });

  it('should delete a persisted Ruleset by id', done => {

    Ruleset
      .findByPk(id)
      .then(ruleset => ruleset.destroy())
      .then(() => Ruleset.findByPk(id))
      .then(ruleset => {
        expect(ruleset).to.be.a('null');
      })
      .then(done);
  });

  it('should allow to score a list of Rulesets', () => {
    const rules = [
      Ruleset.build({
        companyId,
        ruleOrder: 3,
        ruleSet: Rule.of('or').toJSON()
      }),
      Ruleset.build({
        companyId,
        ruleOrder: 1,
        ruleSet: complexRule().toJSON()
      })
    ];

    const scored = Ruleset.getScoredRules(rules);
    const total = scored.reduce((memo, r) => memo + r.score, 0);
    expect(scored).to.be.an('array');
    expect(total).to.be.gt(0);
    expect(scored.shift().element instanceof Rule).to.be.true;
    // Last element should be the 'or' since it has an order of 3
    expect(scored.shift().element.exp).to.be.equal('or');
  });


});


const complexRule = () => {
  // Age should be between 9 and 50, and person B should be younger
  const ageRule = Rule
    .of('and')
    .append(
      Premise.is('//personA.age').gte.to(9)
    )
    .append(
      Premise.is('//personB.age').gte.to(9)
    )
    .append(
      Premise.is('//personA.age').lte.to(50)
    )
    .append(
      Premise.is('//personB.age').lte.to(50)
    )

    .append(
      Premise.is('//personA.age').gt.to('//personB.age')
    );

  // Pair will be valid only if the pair is located in Philly and NYC
  const locationRule = Rule.of('or')
    // Philly - NYC
    .append(
      Rule
        .of('and')
        .append(
          Premise.is('//personA.location.name').eq.to('Philly')
        )
        .append(
          Premise.is('//personB.location.name').eq.to('NYC')
        )
    )

    // NYC - Philly
    .append(
      Rule
        .of('and')
        .append(
          Premise.is('//personA.location.name').eq.to('NYC')
        )
        .append(
          Premise.is('//personB.location.name').eq.to('Philly')
        )
    );

  const all = Rule.of('and')
    .append(ageRule)
    .append(locationRule);


  return all;
};
