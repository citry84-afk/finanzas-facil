import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

async function loadTypeScript(path) {
  const source = readFileSync(new URL(path, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}

const { calculateAutonomos, AUTONOMOS_TRAMOS } = await loadTypeScript('../src/lib/calculos.ts');
const { getPageMeta } = await loadTypeScript('../src/seo/pageMeta.ts');
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 0.00001, `${actual} != ${expected}`);

const example = calculateAutonomos({ income: 36000, expenses: 9600 });
assert.equal(example.rendimientoMensual, 2046);
assert.equal(example.cuota, 401.47);
close(example.reservaFiscalAnual, 4316.472);
close(example.margenMensual, 1438.824);

const boundaries = [
  [0, 0], [670, 0], [670.01, 1], [900, 1], [900.01, 2],
  [1166.69, 2], [1166.7, 3], [1300, 3], [1300.01, 4],
  [1500, 4], [1500.01, 5], [1700, 5], [1700.01, 6],
  [1850, 6], [1850.01, 7], [2030, 7], [2030.01, 8],
  [2330, 8], [2330.01, 9], [2760, 9], [2760.01, 10],
  [3190, 10], [3190.01, 11], [3620, 11], [3620.01, 12],
  [4050, 12], [4050.01, 13], [6000, 13], [6000.01, 14], [1000000, 14],
];
for (const [monthly, index] of boundaries) {
  const result = calculateAutonomos({ income: monthly * 12 / 0.93, expenses: 0 });
  assert.equal(result.tramoIndex, index, `Limite ${monthly}`);
  assert.equal(result.cuota, Math.round(AUTONOMOS_TRAMOS[index].baseMinima * 0.315 * 100) / 100);
}

const lowBase = calculateAutonomos({ income: 36000, expenses: 9600, baseCotizacion: 1 });
const highBase = calculateAutonomos({ income: 36000, expenses: 9600, baseCotizacion: 100000 });
assert.equal(lowBase.baseUsada, 1274.51);
assert.equal(highBase.baseUsada, 2330);

const reduced = calculateAutonomos({ income: 36000, expenses: 9600, cuotaReducida: true });
assert.equal(reduced.cuota, 88.64);
const receipt = calculateAutonomos({ income: 36000, expenses: 9600, cuotaReducida: true, cuotaReducidaMensual: 92.5 });
assert.equal(receipt.cuota, 92.5);
assert.equal(receipt.reservaFiscalAnual, (26400 - 92.5 * 12) * 0.2);

const losses = calculateAutonomos({ income: 0, expenses: 0 });
assert.equal(losses.reservaFiscalAnual, 0);
close(losses.margenMensual, -205.88);
assert.ok(calculateAutonomos({ income: 12000, expenses: 13000 }).margenMensual < 0);
for (const invalid of [NaN, Infinity, -1]) {
  for (const field of ['income', 'expenses', 'baseCotizacion', 'cuotaReducidaMensual']) {
    assert.throws(() => calculateAutonomos({ income: 36000, expenses: 6000, [field]: invalid }), RangeError);
  }
}

assert.equal(getPageMeta('autonomos').canonical, 'https://finanzasmuyfacil.com/autonomos');
console.log(`Autonomos: ejemplo, ${boundaries.length} limites, bases, recibos, perdidas, entradas invalidas y canonical correctos.`);
