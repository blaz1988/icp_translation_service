import {
    Canister,
    ic,
    Manual,
    None,
    Principal,
    query,
    Some,
    update,
    text,
    Ok
} from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
    managementCanister
} from 'azle/canisters/management';

export default Canister({
    translate: update([text, text, text], text, async (api_key, q, target_language) => {
        const response =  await ic.call(managementCanister.http_request, {
            args: [
                {
                    url: `https://translation.googleapis.com/language/translate/v2?q=${q}&target=${target_language}&key=${api_key}`,
                    max_response_bytes: Some(2_000n),
                    method: {
                        get: null
                    },
                    headers: [],
                    body: None,
                    transform: Some({
                        function: [ic.id(), 'translateTransform'] as [
                            Principal,
                            string
                        ],
                        context: Uint8Array.from([])
                    })
                }
            ],
            cycles: 50_000_000n
        });

        return processResponse(response.body);
    }),
    translateTransform: query([HttpTransformArgs], HttpResponse, (args) => {
        return {
            ...args.response,
            headers: []
        };
    })
});

function processResponse(blob) {
    try {
        const textDecoder = new TextDecoder('utf-8');
        const text = textDecoder.decode(blob);
        const jsonData = JSON.parse(text);

        if (jsonData && jsonData.data && jsonData.data.translations && jsonData.data.translations.length > 0) {
            const translatedText = jsonData.data.translations[0].translatedText;
            return translatedText;
        } else {
            return "Error: The expected data is not present in the response.";
        }
    } catch (error) {
        console.error('Error:', error);
        return "Error: An exception occurred while processing the response.";
    }
}
