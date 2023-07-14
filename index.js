
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname)+"/views");
app.set('view engine', 'hbs');
app.use(express.static('public'));


const bodyParser = require('body-parser');
const fs = require('fs');
const jsonParser = bodyParser.json();
const fileName = 'records.json';

// Load data from file
let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));


app.get('/', function(request, response){
//    response.render('home', {name:'John Doe'});
    response.render('home');
});

app.get('/report', function(request, response){
  //    response.render('home', {name:'John Doe'});
      response.render('report');
  });

app.get('/records', (request, response) => {
  response.send(data);
});

app.post('/records', jsonParser, (request, response) => {
  console.log("request.body", request.body)
  data.push(request.body);
  fs.writeFileSync(fileName, JSON.stringify(data));
  response.end();
});

app.listen(port);
console.log(`Server is listening to port: ${port}`);

