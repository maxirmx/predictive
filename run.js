'use strict';

import { createInterface } from 'readline';
import { promisify } from 'util';

import { callFlow } from './main/callflow.js';

async function main() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });
  
    const question = promisify(rl.question).bind(rl);

    var agents = await question('Количество агентов? ');
    var abandonRate = await question('Целевой процент отказов (в процентах)? ');
    var hitRate = await question('Ожидаемый процент дозвона (в процентах)? ');
    var serviceTime = await question('Ожидаемое среднее время обслуживания (в секундах)? ');
    var actualAbandonRate = await question('Фактический процент отказов (в процентах)? ');
  
    var cf = callFlow(agents, abandonRate/100, hitRate/100, serviceTime, actualAbandonRate/100);
  
    console.log("Paccчётный call flow: " + cf + " вызовa(ов) в секунду");
    rl.close();     
}

main();
