var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var json2xls = require('json2xls');

var data=[];

app.set('port', (process.env.PORT || 3000));//setting the port
app.use(express.static(__dirname+'/public'));//use middleware to serve the pub folder
app.set('views', __dirname+'/views')
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(json2xls.middleware);
//when request on route '/'
app.get('/', function(req, res){
  res.render('index');
});

app.post('/', function(req, res){
  //console.log(req.body);
  data.push(req.body);
  for (let i in data ){
    console.log(`${i} ${data[i].name} ${data[i].email} ${data[i].gender} ${data[i].pnumber}`);
  }
  res.send('Thanks');
})

app.get('/download', function(req, res){
  res.xls('digData.xls', data);
})

//starting server
app.listen(app.get('port'), ()=>{
  console.log('listening to localhost:3000');
});
