var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
    http = require('http'),
    util = require('util');
 
http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.uploadDir =  '/upload';

    form.parse(req, function(err, fields, files) {
      if(err) throw err;
    });
    

    form.on('progress', function(bytesReceived, bytesExpected) {
      console.log('progress');
    });
    form.on('field',()=>{
      console.log('field');
    })
    form.on('file',(name,file)=>{
      console.log('file');
      // fs.renameSync(file.path,'./upload/4545.jpg');
    })
    form.on('error',()=>{
      console.log('error');
    })
    form.on('end',()=>{
      res.end();
    })

 
    return;
  }
 
  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" ><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8080);