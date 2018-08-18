# university-app

> ### A Node (Express + Mongoose) application to help students find Universities and offered programs in their country. 

This project is under development and continuous changes. Issues, feature requests, and contributions are welcomed. 

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm start` to start the local server

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [babel-register](https://babeljs.io/docs/en/babel-register.html) - Transpilar for compiling modern javascript to old JS
- [express-fileupload](https://www.npmjs.com/package/express-fileupload) - For uploading files
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [express-paginate](https://github.com/expressjs/express-paginate) - For making pagination
- [nodemailer](https://github.com/nodemailer/nodemailer) - For sending emails 
- [dotenv](https://github.com/motdotla/dotenv) - For keeping secret information safe
