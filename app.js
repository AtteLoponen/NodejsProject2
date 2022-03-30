var express = require('express');
var fetch = require('node-fetch');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static("./views"));

app.set("view engine","ejs");

app.get('/', function (req, res) {
    res.render('pages/index')
    
});


  app.get('/drivers', async (request, response) => {

    const driver_url = `http://ergast.com/api/f1/2022/drivers.json`;
    const driver_response = await fetch(driver_url);
    const driver_data = await driver_response.json();

    response.render("pages/f1drivers", {drivers: driver_data});
  });

  app.get('/constructors', async (request, response) => {

    const constructor_url = `http://ergast.com/api/f1/2022/constructors.json`;
    const constructor_response = await fetch(constructor_url);
    const constructor_data = await constructor_response.json();

    response.render("pages/f1constructors", {constructors: constructor_data});
  });

  app.get('/schedule', async (request, response) => {

    const schedule_url = `http://ergast.com/api/f1/2022.json`;
    const schedule_response = await fetch(schedule_url);
    const schedule_data = await schedule_response.json();

    response.render("pages/f1schedule", {schedule: schedule_data});
  });
 

app.get('*', function (req, res) {
    res.status(404).send("Cannot find the requested page");
});

app.listen(process.env.PORT || 3000, function () {
    console.log('App listening on port 3000');
});