# NODEJS CODE CHALLENGE README #

This repository contains a project for parsing text files and handling URLs that follow specific rules. It includes three script files: `challengeScript.js`, `parser.js`, and `urlProcessor.js`. The project also comes with unit tests and integration tests to ensure functionality. 

There is also a `public` folder that includes some test `.txt` files for demonstration purposes.


### What is this repository for? ###

* Purpose: Script that is parsing a text file (if a relative path is provided to the script) or stdin stream. Parser will go through the txt document and process every unique valid URL between squared brackets. If there are more URLs within the brackets, parser will only take into consideration last URL within the brackets.
* Version: 1.0.0
* Main script: challengeScript.js

### Prerequisites

- **Node.js** (version 20 or later)
- **Jest** (for running tests)
### How do I get set up?

#### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kenan-kuloglija-dev/nodejs-code-challenge.git
   ```
   ```bash
   cd nodejs-code-challenge
    ```
2. Install dependencies:
   ```bash
   npm install

#### Running the Application ####

To run the application, use the following command:
   ```bash 
   npm start <relative-path-to-your-text-file>
```
#### Running all tests ####
To run both unit and integration test, use the following command:
   ```bash 
    npm test
```
#### Running Unit Test ####
To run the unit test, use the following command:
   ```bash 
    npm test parser.test.js
```
#### Running Integration Test ####
To run the integration test, use the following command:
   ```bash 
    npm test challengeScript.test.js
```
### Contribution guidelines ###

* Write tests for any new functionality.
* Ensure code is reviewed by another team member before merging.

### Who do I talk to? ###

* Repo owner: Kenan Kuloglija