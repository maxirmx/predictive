// Tests for utilities
// Copyright  2022 Максим Самсонов [maxirmx], его родственники и знакомые
// License    https://github.com/maxirmx/predictive/blob/main/LICENSE MIT

import { expect } from 'chai';
import { ErlangB, invertedErlangB } from '../main/util.js';

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
    it('invertedErlangB(ErlangB(18.751, 25), 25, 3) should be close to 18.751 [с точностью 10^-3]', function () {
        const p = 3;
        const m = 25;
        const E = 18.75;
        var a = ErlangB(E, m); 
        expect(invertedErlangB(m, a, p)).to.be.closeTo(E, 10**(-p));
    });
    
});
