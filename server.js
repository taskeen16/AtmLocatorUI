const PORT = 3001 ;
const CONTEXT_PATH='dist' ;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const router = express.Router();
const request = require('request');

//const API_ATM_URL = "https://api.us.apiconnect.ibmcloud.com/cloud-microservices-unit-cma-space/sb/apibmap/searchmarkers";
//const API_ATM_URL = "https://atmlocatornodearpita-bold-aligator.mybluemix.net";
const API_ATM_URL = "http://localhost:5000";

// Usings Parsers
var urlencoded_body_parser = bodyParser.urlencoded({
  extended: true
});
app.use(bodyParser.json());
app.use(urlencoded_body_parser);
router.use(bodyParser.urlencoded({ extended: true }));

//Using router
app.use('/', router);

app.get('*',(req,res,next) => {
	console.log(" catch url " + req.url);
	next();
});


/* ---- working */
app.get('/',(req,res) => {
	console.log(" in login " + req.url);
	res.sendFile(path.join(__dirname,"dist/index.html"));
});

app.get('/dist/Trial*',(req,res) => {
	console.log(" in login " + req.url);
	res.sendFile(path.join(__dirname,"dist/index.html"));
});

app.get('*',(req,res) => {
	console.log(" in login " + req.url);
	res.sendFile(path.join(__dirname,req.url));
});


app.post("/api/bmap/searchmarkers",function(req,res){
  console.log('generic user call ' + req.url );
  console.log(req.body);
  console.log("");
  
  var myJSONObject = req.body;
  
	request({
		  url: API_ATM_URL ,
		  method: 'POST',				  
		  json: true,   // <--Very important!!!
		  headers: {
           'Content-Type': 'application/json',
		   'x-ibm-client-secret': 'X1qK6uY6hT3uS2tD7jB5fU1xK1rF6tD8sK6hS3aX3rE7lM8eC8',
		   'x-ibm-client-id': '5a594670-454d-45b5-8b0a-3fb6157f1caf',
          },
	      body: myJSONObject}
		 ,  function (error, response, body){
					if(error)
				  throw error;
				else{
				  console.log(response.body);
				  res.json(response.body);   
				}
	});
	
});


app.listen(PORT, "0.0.0.0", function () {
    // print a message when the server starts listening
    console.log("application running on port: " + PORT);
});