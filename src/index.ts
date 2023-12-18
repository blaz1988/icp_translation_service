import {
  Canister,
  ic,
  None,
  Principal,
  query,
  Some,
  update,
  text,
  Result,
  Err,
  Ok,
} from "azle";
import {
  HttpResponse,
  HttpTransformArgs,
  managementCanister,
} from "azle/canisters/management";

export default Canister({
  translate: update(
    [text, text, text],
    Result(text, text),
    async (api_key, q, target_language) => {
      const response = await ic.call(managementCanister.http_request, {
        args: [
          {
            url: `https://translation.googleapis.com/language/translate/v2?q=${q}&target=${target_language}&key=${api_key}`,
            max_response_bytes: Some(2_000n),
            method: {
              get: null,
            },
            headers: [],
            body: None,
            transform: Some({
              function: [ic.id(), "translateTransform"] as [Principal, string],
              context: Uint8Array.from([]),
            }),
          },
        ],
        cycles: 50_000_000n,
      });

      return processResponse(response.body);
    }
  ),
  translateTransform: query([HttpTransformArgs], HttpResponse, (args) => {
    return {
      ...args.response,
      headers: [],
    };
  }),
});

type TranslationResponse = {
  data?: {
    translations?: Array<{ translatedText: string }>;
  };
};

function processResponse(blob: Uint8Array) {
  try {
    const text = Buffer.from(blob.buffer).toString("utf-8");
    const jsonData = JSON.parse(text) as TranslationResponse;

    if (
      jsonData &&
      jsonData.data?.translations &&
      jsonData.data?.translations?.length > 0
    ) {
      const translatedText = jsonData.data.translations[0].translatedText;
      return Ok(translatedText);
    } else {
      return Err("The expected data is not present in the response.");
    }
  } catch (error) {
    return Err("An exception occurred while processing the response.");
  }
}
