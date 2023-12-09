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

## Google Translate API Key
To use this service, you need a Google Translate API key. You can generate this key at the Google Cloud Console.

## Running Tests

To run tests for the translationService, use the following command:

```
export API_KEY=Your_Google_Translate_API_Key
npm test
```
