// Utilities
// Copyright  2022 Максим Самсонов, его родственники и знакомые
// License    https://github.com/maxirmx/predictive/blob/main/LICENSE MIT

'use strict';

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

// Инвертированный ErlangB
// lines - количество агентов ('lines')
// precision - точночть результата (знаков после запятой)
// abandon - максимальный процент отказов 
// Возвращает normalised load (in erlang)
function invertedErlangB(lines, abandon, precision) {
    var E = 0.0;
    var step = 1.0;
    do {
        do {
            E += step;
        } while ( ErlangB(E, lines) <= abandon )
        E -= step;
        step /= 10.0;
        precision--;
    } while (precision >= 0)

    return E;
}

export { ErlangB, invertedErlangB };