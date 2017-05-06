/*
¿Qué hace este código? Muy sencillo, las primeras líneas se encargan de incluir las dependencias que vamos a usar,
 algo así como los includes en C o PHP, o los import de Python. Importamos Express para facilitarnos crear el servidor y 
 realizr llamadas HTTP. Con http creamos el servidor que posteriormente escuchará en el puerto 3000 de nuestro ordenador
  (O el que nosotros definamos).
Con bodyParser permitimos que pueda parsear JSON, methodOverride() nos permite implementar y personalizar métodos HTTP.
Podemos declarar las rutas con app.route(nombre_de_la_ruta) seguido de los verbos .get(), .post(), etc… y 
podemos crear una instancia para ellas con express.Router()
*/

var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');
// Connection to DB

mongoose.connect('mongodb://cmsmongo:52Nk2hihQgwWgN8R6h9VeKEUlKdq9LU9Hl2BjJobX12eZN3bHZt4LAPr8wEVm7wbfoo2QETapqXl68HOGLJv6g==@cmsmongo.documents.azure.com:10250/CMSData/?ssl=true', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});



// Middlewares

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(methodOverride());



// Import Models and controllers

var models     = require('./Models/User')(app, mongoose);

var UserCtrl = require('./Controllers/UsersController');

// Example Route

var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

// API routes
var myusers = express.Router();
myusers.route('/users')

  .get(UserCtrl.findAllUsers)

  .post(UserCtrl.addUser);


app.use('/api', myusers);



// Start server

app.listen(3000, function() {

  console.log("Node server running on http://localhost:3000");

});