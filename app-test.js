var SerialPort = require("serialport");
var serialport = new SerialPort("/dev/cu.usbmodem1411");
serialport.on('open', function(){
  console.log('Serial Port Opened');
  serialport.on('data', function(data){
      console.log(data[0]);
  });
});