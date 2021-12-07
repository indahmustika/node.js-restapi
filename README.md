# Simple CRUD Rest API Using Node.js
- Create package.json to store dependencies <code>npm init</code> and change entery point to app.js 
- Install all dependencies <code>npm install express mysql body-parser cors --save</code>
  - Express: node.js framework
  - MySQL: database connection
  - Body Parser: parsing data from client input
  - Cors: unblock fetch access
- Create app.js and lets code
- Require all dependencies
```
var express     = require('express');
var mysql       = require('mysql');
var bodyParser  = require('body-parser');
var cors        = require('cors');
```
- Express init, create connection, use body parser and cors
```
var app = express();
var con = mysql.createConnection({
	host	 : "localhost",
	user	 : "root",
	password : "",
	database : "node_note"
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
```
- Create GET request endpoint for get data 
```
app.get('/note', function(req, res, next){
	var sql = "SELECT * FROM notes";
	con.query(sql,(err,result)=>{
		res.json(result);
	});
});
```
- Create POST request endpoint for send data 
```
app.post('/note', function(req, res, next){
	let title 	= req.body.title;
	let content = req.body.content;
	var sql 	= "INSERT INTO notes (id, title, content, created_at, updated_at) VALUES (NULL, '"+title+"', '"+content+"', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)"; 
	con.query(sql,(err,result)=>{
		res.json({"message": "Note created successfully"});
	});
});
```
- Create PUT request endpoint for update data
```
app.put('/note/:id', function(req, res, next){
	let id		= req.params.id;
	let title	= req.body.title;
	let content = req.body.content;
	var sql 	= "UPDATE notes SET title = '"+title+"', content = '"+content+"', updated_at = CURRENT_TIMESTAMP WHERE id = '"+id+"'";
	con.query(sql,(err,result)=>{
		res.json({"message": "Note updated successfully"});
	});
});
```
- Create DELETE request endpoint for delete data
```
app.delete('/note/:id', function(req, res, next){
	let id	= req.params.id;
	var sql = "DELETE FROM notes WHERE id = '"+id+"'";
	con.query(sql,(err,result)=>{
		res.json({"message": "Note deleted successfully"});
	});
});
```
- Create listen method to run server
```
app.listen(3000, function(){
	console.log("Your app is running on port 3000")
});
```
- Run app <code>node app.js</code>
- Test api using postman 

![2021-9-12_0-10-33](https://user-images.githubusercontent.com/55520351/132955850-17365d15-aad7-457b-87ad-9f240e1fed53.PNG)
