var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var SerialPort = require("serialport");
var serialport = new SerialPort("/dev/cu.usbmodem1411",{
	parser: SerialPort.parsers.readline('\n')
});
serialport.on('open', function(){
  console.log('Serial Port Opened');
});

server.listen(8000);

app.use(express.static('public'));

app.get('/display', function(req, res) {
	console.log('display page');
	res.sendFile(__dirname + '/public/display.html');
});

app.get('/about', function(req, res) {
	console.log('about page');
	res.sendFile(__dirname + '/public/about.html');
});

io.on('connection', function(socket) {

	serialport.on('data', function(data){
		console.log(data);
		socket.emit('data', data);
	});
});


