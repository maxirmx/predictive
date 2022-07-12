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
    var hitRate = await question('Процент дозвона (в процентах)? ');
    var  serviceTime = await question('Среднее время обслуживания (в секундах)? ');
  
    var cf = callFlow(agents, abandonRate/100, hitRate/100, serviceTime, 0);
  
    console.log("Paccчётный call flow: " + cf + " вызовa(ов) в секунду");
    rl.close();     
}

main();
