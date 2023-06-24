// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// var dotenv = require('dotenv'); // Importo dotenv para mantener privada las configuraciones del servidor
// dotenv.config(); // Cargo las configuraciones explicitas en el archivo .env en las variables de entorno (process.env)

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  let query = req.params.date
  if (query) {
      if (/^\d+$/.test(query)) // Verificar si query esta compuesto solo por numeros
          query = parseInt(query)
      let utc = new Date(query).toUTCString(); // Almacenamos el objeto de fecha en una variable con formato UTC
      let unix = new Date(query).getTime(); // Almacenamos el objeto de fecha en una variable con formato unix
      
      if (utc === "Invalid Date") 
          res.json({error: utc});
      else 
          res.json({unix: unix, utc: utc});
  }else{
      let utc = new Date().toUTCString();
      let unix = new Date().getTime();
      res.json({unix: unix, utc: utc});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
