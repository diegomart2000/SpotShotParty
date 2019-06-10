const Premise = require('../../model/rules/Premise');

describe('Premise', () => {

  it('should build a premise with sugar', () => {
    const p = Premise
      .is(30)
      .gt
      .to(20);

    expect(p instanceof Premise).to.be.true;

    const json = JSON.stringify(p);
    expect(json).to.be.equal('{"left":30,"operator":"gt","right":20}');
  });

  it('should build a premise from object', () => {
    const json = '{"left":30,"operator":"gt","right":20}';
    const p = Premise.from(JSON.parse(json));

    expect(p instanceof Premise).to.be.true;

    const str = JSON.stringify(p);
    expect(str).to.be.equal(json);
    expect(p.eval()).to.be.equal(1);
  });

  describe('Literal values', () => {
    it('should assert the greater than evaluation on literal values', () => {
      const premise = Premise
        .is(30)
        .gt
        .to(20);

      expect(premise.eval()).to.be.equal(1);
    });

    it('should assert the greater or equal to evaluation on literal values', () => {
      const premise = Premise
        .is(20)
        .gte
        .to(20);

      expect(premise.eval()).to.be.equal(1);
    });

    it('shouldnt assert the greater than evaluation on literal values', () => {
      const premise = Premise
        .is(10)
        .gt
        .to(20);

      expect(premise.eval()).to.be.equal(0);
    });

    it('shouldnt assert the greater or equal to evaluation on literal values', () => {
      const premise = Premise
        .is(10)
        .gte
        .to(20);

      expect(premise.eval()).to.be.equal(0);
    });

    it('should assert the equal than evaluation on literal values', () => {
      const premise = Premise
        .is(20)
        .eq
        .to(20);

      expect(premise.eval()).to.be.equal(1);
    });

    it('shouldnt assert the equal than evaluation on literal values', () => {
      const premise = Premise
        .is(10)
        .eq
        .to(20);

      expect(premise.eval()).to.be.equal(0);
    });
  }); //Literal values

  describe('Object values', () => {
    it('should assert the greater than evaluation on object values', () => {
      const o = {
        age: 30
      };

      const premise = Premise
        .is('//age')
        .gt
        .to(20);

      expect(premise.eval(o)).to.be.equal(1);
    });

    it('should assert the greater or equal to evaluation on object values', () => {
      const o = {
        age: 20
      };

      const premise = Premise
        .is('//age')
        .gte
        .to(20);

      expect(premise.eval(o)).to.be.equal(1);
    });

    it('shouldnt assert the greater than evaluation on object values', () => {
      const o = {
        age: 10
      };

      const premise = Premise
        .is('//age')
        .gt
        .to(20);

      expect(premise.eval(o)).to.be.equal(0);
    });

    it('shouldnt assert the greater or equal to evaluation on object values', () => {
      const o = {
        age: 10
      };

      const premise = Premise
        .is('//age')
        .gte
        .to(20);

      expect(premise.eval(o)).to.be.equal(0);
    });

    it('should assert the equal than evaluation on object values', () => {
      const o = {
        age: 20
      };

      const premise = Premise
        .is('//age')
        .eq
        .to(20);

      expect(premise.eval(o)).to.be.equal(1);
    });

    it('shouldnt assert the equal than evaluation on object values', () => {
      const o = {
        age: 10
      };

      const premise = Premise
        .is('//age')
        .eq
        .to(20);

      expect(premise.eval(o)).to.be.equal(0);
    });
  }); //Object values

});
