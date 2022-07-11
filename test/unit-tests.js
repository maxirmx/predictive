// Tests for utilities
// Copyright  2022 Максим Самсонов [maxirmx], его родственники и знакомые
// License    https://github.com/maxirmx/predictive/blob/main/LICENSE MIT

import { expect } from 'chai';
import { _factorial, _ErlangB, ErlangB } from '../main/util.js';
import { invertedErlangB } from '../main/convex.js';

describe('factorial', function () {
    it('0! should be equal to 1', function () {
        expect(_factorial(0)).to.equal(1);
    });
    it('1! should be equal to 1', function () {
        expect(_factorial(1)).to.equal(1);
    });
    it('10! should be equal to 1*2*3*4*5*6*7*8*9*10', function () {
        expect(_factorial(10)).to.equal(1*2*3*4*5*6*7*8*9*10);
    });
});

describe('ErlangB', function () {
    it('ErlangB(9, 12) should be close to 0.083', function () {
        expect(_ErlangB(9, 12)).to.be.closeTo(0.083, 0.001);
    });
    it('ErlangB(9.2, 15) should be close to 0.023', function () {
        expect(_ErlangB(9.2, 15)).to.be.closeTo(0.023, 0.001);
    });
});

describe('Оптимизированный ErlangB', function () {
    it('ErlangB(9, 12) should be close to 0.083', function () {
        expect(ErlangB(9, 12)).to.be.closeTo(0.083, 0.001);
    });
    it('ErlangB(9.2, 15) should be close to 0.023', function () {
        expect(ErlangB(9.2, 15)).to.be.closeTo(0.023, 0.001);
    });
});

describe('Инвертированный ErlangB', function () {
    it('invertedErlangB(22, 0.0753, 2) should be close to 18.5', function () {
        expect(invertedErlangB(22, 0.0753, 2)).to.be.closeTo(18.5, 0.01);
    });
    it('ErlangB(invertedErlangB(20, 0.0753, 2), 20) should be close to 0.0753', function () {
        const a = 0.0753;
        const p = 2;
        const m = 20;
        var E = invertedErlangB(m, a, p); 
        expect(ErlangB(E, m)).to.be.closeTo(a, 0.0001);
    });
    it('invertedErlangB(ErlangB(18.75, 25), 25, 3) should be close to 18.75 [с точностью 10^-3]', function () {
        const p = 3;
        const m = 25;
        const E = 18.75;
        var a = ErlangB(E, m); 
        expect(invertedErlangB(m, a, p)).to.be.closeTo(E, 10**(-p));
    });
    
});
