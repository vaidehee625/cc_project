var http = require('http');
var dt = require('./myfirstmodule'); // Make sure the filename matches exactly

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write("The date and time is currently: " + dt.myDateTime());
  res.end();
}).listen(8080);

console.log("Server running at http://localhost:8080/");



















