var express		= require('express');
var mysql		= require('mysql');
var bodyParser	= require('body-parser');
var cors		= require('cors');

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

app.get('/note', function(req, res, next){
	var sql = "SELECT * FROM notes";
	con.query(sql,(err,result)=>{
		res.json(result);
	});
});

app.post('/note', function(req, res, next){
	let title 	= req.body.title;
	let content = req.body.content;
	var sql 	= "INSERT INTO notes (id, title, content, created_at, updated_at) VALUES (NULL, '"+title+"', '"+content+"', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)"; 
	con.query(sql,(err,result)=>{
		res.json({"message": "Note created successfully"});
	});
});

app.put('/note/:id', function(req, res, next){
	let id		= req.params.id;
	let title	= req.body.title;
	let content = req.body.content;
	var sql 	= "UPDATE notes SET title = '"+title+"', content = '"+content+"', updated_at = CURRENT_TIMESTAMP WHERE id = '"+id+"'";
	con.query(sql,(err,result)=>{
		res.json({"message": "Note updated successfully"});
	});
});

app.delete('/note/:id', function(req, res, next){
	let id	= req.params.id;
	var sql = "DELETE FROM notes WHERE id = '"+id+"'";
	con.query(sql,(err,result)=>{
		res.json({"message": "Note deleted successfully"});
	});
});

app.listen(3000, function(){
	console.log("Your app is running on port 3000")
});