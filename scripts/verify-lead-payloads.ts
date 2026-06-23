import { runPayloadSelfChecks } from '../src/lib/leadQualification';

const result = runPayloadSelfChecks();

if (result.failed.length > 0) {
  console.error('Payload self-checks failed:');
  for (const failure of result.failed) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Payload self-checks passed (${result.passed} scenarios).`);
