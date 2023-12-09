import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/translate';
import { getTests } from './tests';

const translateCanister = createActor(
    getCanisterId('translationService'),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

runTests(getTests(translateCanister));
