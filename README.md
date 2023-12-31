# Translation Service

TranslationService is an ICP canister designed to provide translation functionality. It leverages the Google Translate API to translate text from English to a target language of your choice.

## Prerequisites

Before setting up the project, ensure you have the following installed:

* Node.js and npm (Node Package Manager)
* DFINITY Canister SDK (dfx)

```
bundle exec rspec spec
```

## Setup

To set up the translationService, follow these steps:

###  Install Dependencies:
Run the following command to install the necessary dependencies:

```
npm install
```

### Start the Local Canister Execution Environment
```
dfx start --clean --host 127.0.0.1:8000
```

### Deploy the Canister:
```
dfx deploy
```

## Usage

To use the translationService, make a call to the canister with the required arguments: an API key, the query (text to be translated), and the target language code.


```
dfx canister call translationService translate '("Your_Google_Translate_API_Key", "Text_to_Translate", "Target_Language_Code")'

```
![trans2](https://github.com/blaz1988/icp_translation_service/assets/5670807/0e21720d-1769-49de-a548-bbafdd110ec5)


## Google Translate API Key
To use this service, you need a Google Translate API key. You can generate this key at the Google Cloud Console - https://console.cloud.google.com/marketplace/product/google/translate.googleapis.com?_ga=2.22153913.-324765067.1702156975

## Running Tests

To run tests for the translationService, use the following command:

```
export API_KEY=Your_Google_Translate_API_Key
npm test
```

![image](https://github.com/blaz1988/icp_translation_service/assets/5670807/b507fe5d-0ffa-4a7f-8b34-fd1fb6bf2496)

