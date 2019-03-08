process.stdout.write('Hellow  Word');
process.argv.forEach(function(val, index, array) {
   console.log(index + ': ' + val);
});