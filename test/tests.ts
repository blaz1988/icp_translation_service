import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/translationService/translationService.did';
import { HttpResponse } from 'azle/canisters/management';
import decodeUtf8 from 'decode-utf8';

export function getTests(
    translationService: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'translationService',
            test: async () => {
                // Define test arguments
                const apiKey = process.env.API_KEY; // set up ENV export API_KEY=your_actual_api_key
                const queryText = 'car'; // Example query text
                const targetLanguage = 'hr'; // Example target language (Croatian)

                const result = await translationService.translate(apiKey, queryText, targetLanguage);

                // Check the result
                return {
                    Ok: checkResult(result)
                };
            }
        },
    ];
}

function checkResult(result: string): boolean {
    return result === "automobil";
}