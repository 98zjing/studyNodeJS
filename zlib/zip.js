const  zlib = require('zlib');
const   fs = require('fs');

let  file = './text.txt'
let stream = fs.createReadStream(file);
let  gzip = zlib.createGzip();
let  out = fs.createWriteStream('./text.txt.gz');

stream.pipe(gzip).pipe(out);