import * as Benchmark from 'benchmark'
import benchmarkFunctions from './benchmarkFunctions'

const benchmarkedFnsArray = Array.isArray(benchmarkFunctions) ? benchmarkFunctions : [benchmarkFunctions];

const testSuite = new Benchmark.Suite();

benchmarkedFnsArray.forEach((benchmarkedSpec) => {
    testSuite.add(benchmarkedSpec);
});

testSuite.on("complete", function () {
    for (let index = 0; index < this.length; index++) {
        const benchmark = this[index];
        console.log(benchmark.name);
        console.log(`Mean:    ${Math.round(benchmark.stats.mean * 1000)} ms`);
        console.log(`Std Dev: ${Math.round(benchmark.stats.deviation * 1000)} ms`);
    }
}).run({'async': true});