import { writeFileSync } from 'node:fs';
import { render } from '@react-email/render';
import { Tailwind as LocalTailwind } from '@react-email/tailwind';
import { Tailwind as VersionSeventeenTailwind } from 'tailwind-0.0.17';
import { Bench } from 'tinybench';
import EmailWithTailwind from './emails/with-tailwind.js';

const main = async () => {
  const bench = new Bench({
    iterations: 100,
  });

  bench
    .add('local', async () => {
      await render(<EmailWithTailwind Tailwind={LocalTailwind} />);
    })
    .add('0.0.17', async () => {
      await render(<EmailWithTailwind Tailwind={VersionSeventeenTailwind} />);
    });

  await bench.run();

  return bench;
};

main()
  .then((bench) => {
    writeFileSync(
      'bench-results-100-iterations.json',
      JSON.stringify(bench.results),
      'utf-8',
    );
    console.table(bench.table());
  })
  .catch(console.error);
