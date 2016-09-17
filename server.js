var express = require('express');
var app = express();
var path = require("path");

app.use(express.static('public'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(3000, function (err){
	if (err) return console.log('Hubo un error').process.exit(1);

	console.log('Aplicación escuchando en el puerto 3000');
});