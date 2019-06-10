const Score = require('../../model/rules/Score');

describe('Score', () => {  
  describe('Scoring elements', () => {
    const elements = [
      {
        value: 'a',
        eval: a => a
      },
      {
        value: 'b',
        eval: b => b
      },
      {
        value: 'c',
        eval: c => c
      },
      {
        value: 'd',
        eval: d => d
      },
      {
        value: 'e',
        eval: e => e
      }

    ];

    let scored = null;
    beforeEach(() => {
      scored = Score.scoreElements(elements);
    });
  
    it('should assign a score to a list of elements', () => {
      expect(scored).to.be.an('array');
      expect(scored.length).to.be.equal(elements.length);
    });
  
    it('should have a third element with higher score than prev two elements', () => {
      const elements = scored.reverse();
      const prev = elements.slice(0, 2).reduce((n, element) => n+=element.score, 0);
      const third = elements[2];
  
      expect(third.score).to.be.gt(prev);
    });
  
    it('should have a last element with higher score than all prev elements', () => {
      const last = scored.shift().score;
      const prev = scored.reduce((n, element) => n += element.score, 0);
  
      expect(last).to.be.gt(prev);
    });
  });
})