# Movies App frontend (Testing) 


## Cypress Test

### Install dependencies

    npm install
    
### Configure your environment variables 

    PORT= <your application port>
    ENV=development
    API_URL=<your backend API>
    API_KEY_TOKEN=<your backend API key token>
    
    // MONGO
    DB_USER=<your mongodb user>
    DB_PASSWORD=<your mongodb password>
    DB_HOST=<your mongodb host>
    DB_NAME=<your mongodb name>

### Run the tests (Development)

    npm run test:dev


### Run the tests (Production)
Configure your Cypress project id on cypress.json
	
	"projectId": "<your project id>",
Configure your Cypress Record Key on package.json

    "cypress:run": "cypress run --project ./test trashAssetsBeforeRuns: true --record --key <your key>",

Run the tests and upload to [cypress.io](https://www.cypress.io/)

    npm run test

