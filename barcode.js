//(415)7709008266513(8020)00022521(3900)0001271018(96)20160726
var url = require('url');
var http = require('http');
var bwip = require('bwip');
var fs = require('fs');
var pngToJpeg = require('png-to-jpeg');
 
function error(res, status, message) {
    res.writeHead(status, { 'Content-Type':'text/plain' });
    res.end(message, 'ascii');
}
 
http.createServer(function(req, res) {
    var urlparse = url.parse(req.url, true)
	var barcode = urlparse.pathname.replace('/','').replace('.png','')
    var filename = barcode.slice(24,32)
	console.log("barcode:", barcode)
	if(barcode == undefined || barcode == "" || barcode.length < 50 || barcode.length > 100) {
		console.log("No barcode")
		return error(res, 400, 'barcode undefined.\r\n');
	}
 
    // Set the defaults
    var wscale  = wscale = 1; 
    var hscale  = hscale = 1.2;
    var rotate = rotate = 'N'; 
    var bcid   = bcid = 'gs1-128';
    var text   = barcode 
	var options = {
		alttext: barcode,
		parsefnc: true,
        monochrome : true
	};
 
    if (!text)
        return error(res, 400, 'Bar code text not specified.\r\n');
    if (!bcid)
        return error(res, 400, 'Bar code type not specified.\r\n');
 
    // Return a PNG-encoded image
    var png = bwip.png(bcid, text, wscale, hscale, rotate, options, function(err) {
		console.log(err)
	});
	
	res.writeHead(200, {'Content-Type': 'image/jpeg' });
    res.end(png, 'binary');


}).listen(3137);
