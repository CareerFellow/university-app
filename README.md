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
- [express-validator](https://github.com/express-validator/express-validator) - For validating input request
- [express-sessions](https://www.npmjs.com/package/express-sessions) - For storing and managing sessions
- [bcrypt](https://www.npmjs.com/package/bcrypt) - For hashing password

## Application view

#### Rendering Enging
[Handlebars](https://handlebarsjs.com/) - We are using handlebars.js as our templating engine because of its simplicity and richness. The Handlebars supports in all major browsers, like, Chrome Firefox, Safari and Internet Explorer. We are planning to switch to react in future.
#### Design Template
[tabler](https://tabler.github.io/tabler/) - We are using tabler (an open source HTML template) for our pages. It is a free and open-source HTML Dashboard UI Kit built on Bootstrap 4.

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `controllers/` - This folder contains our controllers 
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `helpers/` - This folder contains the validation helpers
- `views/` - This folder all views related to this application
- `public/` - This folder contains all public resources
