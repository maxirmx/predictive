// Utilities
// Copyright  2022 Максим Самсонов, его родственники и знакомые
// License    https://github.com/maxirmx/predictive/blob/main/LICENSE MIT

'use strict';

// Факториал
// n!
function _factorial(n) {
    var f=1;
    for (var i = 2; i <= n; i++)
        f = f * i;
    return f;
}

// ErlangB -- "В лоб"
// E - normalised load (in erlang)
// lines - количество свободных агентов ('lines')
// Возвращает вероятность блокировки
function _ErlangB(E, lines)
{
    var L = (E**lines) / _factorial(lines);
    var sum = 0;
    for (var i = 0; i <= lines; i++) 
        sum += (E**i) / _factorial(i);
    return (L / sum);
}

// ErlangB -- оптимизированный
// E - normalised load (in erlang)
// lines - количество свободных агентов ('lines')
// Возвращает вероятность блокировки
function ErlangB (E, lines)
{
    var invB = 1.0
    for (var j = 1; j <= lines; j++)
        invB = 1.0 + invB * j / E 
    return (1.0 / invB);
}

export { _factorial, _ErlangB, ErlangB };