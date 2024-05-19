const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
require('dotenv').config();
const moment = require('moment');
const morgan = require('morgan');
const debug = require('morgan')('Myapp');

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'My App';
const { readFile, writeFile} = require("./src/files.js");
const app = express();
const FILE_NAME = './db/person.json';
const FILE_NAME_ACCESS = "./db/acces.json";

process.env.debug= '*'
app.use(morgan('combined'));
app.set("views", "./src/views");
app.set("view engine", "ejs");



app.get("/persons", (req, res) => {
    const acces = readFile(FILE_NAME_ACCESS);
    

    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');

    acces.push(currentTime);

    const accesJson = JSON.stringify(acces);

    writeFile(FILE_NAME_ACCESS, accesJson);
    

    
    const persons = readFile(FILE_NAME);

    const filteredPersons = persons.filter(person => {
        const ageInYears = person.age; 
        const ageInDays = ageInYears * 365; 
        return ageInDays > 5475; 
      });
      res.render('persons', {  filteredPersons : filteredPersons});

  });


app.listen(PORT, () =>
console.log(`${APP_NAME} is running on http://localhost:${PORT}`)
 );




