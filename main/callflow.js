// Utilities
// Copyright  2022 Максим Самсонов, его родственники и знакомые
// License    https://github.com/maxirmx/predictive/blob/main/LICENSE MIT

'use strict';

import { invertedErlangB } from './util.js';


const precision = 4;  // точность вычислений, знаков после запятойб т.е. 10^(-precision)

//   agents -количество агентов
//   abandonRate - процент отказов
//   hitRate - процент дозвона
//   serviceTime - среднее время обслуживания (включая время на пост обработку)
//   placedCalls - количество исходящих вызовов, которые ещё "не дошли" до агента
//                 т.е. то, что набирается, соединяется, ожидает подключения агента 

// returns: call flow (количество вызовов в единицу времени, ту же, что и serviceTime)

function callFlow(agents, abandonRate, hitRate,serviceTime, placedCalls) {
    var E  = invertedErlangB(agents, abandonRate, precision);
    return Math.max((E/serviceTime - placedCalls)/hitRate, 0);
}

export { callFlow };