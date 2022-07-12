// Utilities
// Copyright  2022 Максим Самсонов, его родственники и знакомые
// License    https://github.com/maxirmx/predictive/blob/main/LICENSE MIT

'use strict';

// Оптимизированный ErlangB
// ..........................................
// Данная функция реализует формулу "Эрланг Б" (Erlang B), то есть вычисляет вероятность отказа в обслкживании
// при заданных значения количества "линий" и интенсивность нагрузки
// Параметры:
//      E - интенсивность нагрузки (в Эрлангах)
//      lines - количество "линий"  (в нашем случае - общее количество агентов)
// Результат:  вероятность отказа в обслуживании
// Про алгоритм расчёта
//   см. https://en.wikipedia.org/wiki/Erlang_(unit)#Erlang_B_formula
//   считать "по определению", очень неэффективно - много степеней и факториалов
//   в данной функции используется более эффективная рекурретная формула (см. wiki)
// Функция, которая считает "по определению", есть в тестах. Называется _ErlangB  
function ErlangB (E, lines)
{
    var invB = 1.0
    for (var j = 1; j <= lines; j++)
        invB = 1.0 + invB * j / E 
    return (1.0 / invB);
}

// Инвертированный ErlangB
// ..........................................
// Данная функция по заданному количеству "линий" и вероятности отказа в обслуживании вычисляет интенсивность нагрузки
// То есть, если 
//   abandon = ErlangB(E, lines) 
// то
//   E = invertedErlangB(line, abandon)  
// Параметры:
//      abandon - вероятность отказа в обслуживании
//      lines - количество "линий"  (в нашем случае - общее количество агентов)
//      precision - точноcть результата (знаков после запятой)     
// Результат:
//      интенсивность нагрузки (в Эрлангах)
// Про алгоритм расчёта
//      - для больших значений lines есть аналитические аппроксимации
//        что-то такое: https://www.academia.edu/6180753/Simple_approximation_for_Erlang_B_formula
//        но, IMHO, на значениях 10-20 lines такие методы работаю плохо
//      - тут реализован достаточно примитивный перебор
//      - можно вычислять методом половинного деления (функция invertedErlangB2), но метод половинного деления будет
//        более эффективным, при E > 15, примерно

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

// то же самое методом половинного деления
function invertedErlangB2(lines, abandon, precision) {
    var delta = 10.0**(-precision);
    var Elow  = delta;
    var Ehigh = 200.0;

    delta *= 2.0;

    do {
        var Emid = (Ehigh + Elow)/2.0;
        var amid = ErlangB(Emid, lines);

        if (amid < abandon) Elow = Emid;
        else                Ehigh = Emid; 
    
    } while (Ehigh-Elow > delta)

    return (Ehigh + Elow)/2.0;
}


export { ErlangB, invertedErlangB, invertedErlangB2 };