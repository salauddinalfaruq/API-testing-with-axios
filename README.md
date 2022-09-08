

## API_testing_with_axios

### Description
- Login to the collection with valid email and password and generate token.
- Get user list with valid info.
- Create,Search,Update and Delete user.


### Tools,Framework and Language
- axios
- mocha,chai,mochawesome
- Visual Studio Code
- javascript

### How to run the project
#### Prerequisite
- VS Code
- give the command to install dependencis mocha,chai,axios,fs,faker,shelljs
  
  `npm i mocha chai`

  `npm i axios`

  `npm i fs` for file write

  `npm i @faker-js/faker` for generating randm data

  `npm i shelljs` for run the project from terminal dynamically

### Steps to run
- Clone the repo
- Give command in root directory

  `node test file (filename)` or 

  `npx mocha filename --timeout=20000`

### Report
- For generating report install mochawesome and generate a file mochawesome.js and clone code mochawesome.js.
  
  For install mochawesome 

  `npm i mochawesome`

  Set mochawesome.js file to package.json scripts and give command

  `npm start file (filename`

Report Overview
![report-overview](https://user-images.githubusercontent.com/108132871/189202804-c4a0d6e8-9bec-4cbd-951c-f622823fd55c.PNG)
  
Detail
![detail-1](https://user-images.githubusercontent.com/108132871/189202887-2a165f63-2307-4631-82c2-904cb87801b1.PNG)

Detail
![detail-2](https://user-images.githubusercontent.com/108132871/189202904-193a871e-7911-4983-9867-69fcc1dcff8a.PNG)
