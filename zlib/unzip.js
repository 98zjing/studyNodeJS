const zlib =  require('zlib');
const fs =  require('fs');
let readStream = fs.createReadStream('text.txt.gz');
let writeStream = fs.createWriteStream('text.1.txt');


readStream.pipe(zlib.createGunzip()).pipe(writeStream);