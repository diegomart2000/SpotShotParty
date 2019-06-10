const Rule = require('../../model/rules/Rule');
const Premise = require('../../model/rules/Premise');

describe('Rule', () => {

  it('should build a rule with sugar', () => {
    const a = Premise.is('//age').gt.to(20);
    const b = Premise.is('//age').lt.to(30);
    const rule = Rule.of('and').append(a).append(b);

    expect(rule instanceof Rule).to.be.true;
  });

  it('should build a rule from object', () => {
    const json = '{"condition":"and","premises":[{"left":"//age","operator":"gt","right":20},{"left":"//age","operator":"lt","right":30}]}';
    const rule = Rule.from(JSON.parse(json));

    expect(rule instanceof Rule).to.be.true;

    const str = JSON.stringify(rule);
    expect(str).to.be.equal(json);

    expect(rule.eval({ age: 25 })).to.be.equal(1);
    expect(rule.eval({ age: 19 })).to.be.equal(0);
  });

  it('should eval TRUE with an AND condition for TRUE premises', () => {
    const premiseA = Premise.is(30).gt.to(20);
    const premiseB = Premise.is(10).lt.to(30);

    expect(Rule.of('and').append(premiseA).append(premiseB).eval()).to.be.equal(1);
  });

  it('should eval FALSE with an AND condition for one TRUE and one FALSE premises', () => {
    const premiseA = Premise.is(30).gt.to(20);
    const premiseB = Premise.is(30).lt.to(30);

    expect(Rule.of('and').append(premiseA).append(premiseB).eval()).to.be.equal(0);
  });

  it('should eval TRUE with an OR condition for one TRUE and one FALSE premises', () => {
    const premiseA = Premise.is(30).gt.to(20);
    const premiseB = Premise.is(30).lt.to(30);

    expect(Rule.of('or').append(premiseA).append(premiseB).eval()).to.be.equal(1);
  });

  it('should eval TRUE with an OR condition for two TRUE premises', () => {
    const premiseA = Premise.is(30).gt.to(20);
    const premiseB = Premise.is(10).lt.to(30);

    expect(Rule.of('or').append(premiseA).append(premiseB).eval()).to.be.equal(1);
  });

  it('should eval FALSE with an OR condition for two FALSE premises', () => {
    const premiseA = Premise.is(10).gt.to(20);
    const premiseB = Premise.is(40).lt.to(30);

    expect(Rule.of('or').append(premiseA).append(premiseB).eval()).to.be.equal(0);
  });


  it('should eval TRUE with an AND condition for one Rule and one TRUE premise', () => {
    const premiseA = Rule.of('or').append(Premise.is(30).gt.to(20));
    const premiseB = Premise.is(10).lt.to(30);

    expect(Rule.of('and').append(premiseA).append(premiseB).eval()).to.be.equal(1);
  });

  it('should eval FALSE with an AND condition for one Rule FALSE and one TRUE premise', () => {
    const premiseA = Rule.of('or').append(Premise.is(30).lt.to(20));
    const premiseB = Premise.is(10).lt.to(30);

    expect(Rule.of('and').append(premiseA).append(premiseB).eval()).to.be.equal(0);
  });

  it('should eval TRUE for object premises', () => {
    const person = {
      age: 30,
      name: 'Diego'
    };

    const premiseA = Premise.is('//age').gt.to(20);
    const premiseB = Premise.is('//age').lt.to(30);

    const ruleA = Rule
      .of('or')
      .append(premiseA)
      .append(premiseB);

    const premiseC = Premise.is('//name').contains.to('e');

    const all = Rule
      .of('and')
      .append(ruleA)
      .append(premiseC);

    expect(all.eval(person)).to.be.equal(1);
  });

  it('should eval TRUE for two object premises', () => {
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

    const all = complexRule();
    expect(all.eval(pair)).to.be.equal(1);
  });

  it('should eval FALSE for two object premises that dont meet rules', () => {
    const personA = {
      age: 30,
      name: 'Diego',
      location: {
        id: 1,
        name: 'Philly'
      }
    };

    const personB = {
      age: 8,
      name: 'Alexia',
      location: {
        id: 1,
        name: 'Mia'
      }
    };

    const pair = {
      personA,
      personB,
    };

    const all = complexRule();
    expect(all.eval(pair)).to.be.equal(0);
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
