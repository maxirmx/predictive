// Convex
// Copyright  2022 Максим Самсонов, его родственники и знакомые
// License    https://github.com/maxirmx/predictive/blob/main/LICENSE MIT

'use strict';

import { ErlangB } from './util.js';

// Инвертированный ErlangB
// lines - количество свободных агентов ('lines')
// precision - точночть результата (знаков после запятой)
// abandon - максимальный процент отказов 
// Возвращает normalised load (in erlang)
function invertedErlangB(lines, abandon, precision) {
    var E = 0.0;
    var step = 1.0;
    while (precision >= 0) {
        while ( ErlangB(E, lines) < abandon ) {
            E += step;
        }
        E -= step;
        step /= 10.0;
        precision--;
    }

    return E;
}

export { invertedErlangB };