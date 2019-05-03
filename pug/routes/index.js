var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  console.log('index');
  res.render('index', { title: 'Express' });
})

.get('/index', function(req, res, next) {
  console.log('index');
  res.render('index', { title: 'Express' });
})

.get('/consultingBusiness', function(req, res, next) {
  console.log('consultingBusiness');
  res.render('consultingBusiness', { title: 'Express' });
})

.get('/valueAddedService', function(req, res, next) {
  res.render('valueAddedService', { title: 'Express' });
})

.get('/trainingBusiness', function(req, res, next) {
  res.render('trainingBusiness', { title: 'Express' });
})

.get('/mobileApplications', function(req, res, next) {
  res.render('mobileApplications', { title: 'Express' });
})

.get('/messageBoard', function(req, res, next) {
  res.render('messageBoard', { title: 'Express' });
})

.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
})

.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});



module.exports = router;
