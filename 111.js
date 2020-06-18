var http = require('http');
var multer = require('multer'); 
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var pg = require('pg');
var fs = require('fs');
// 数据库配置
var config = { 
 user:"postgres",
 database:"sherlock",
 password:"990929",
 port:5432,
 
}
var pool = new pg.Pool(config);
app.listen(3000,'127.0.0.1');
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data
 //app.use('/', index);

	app.use('/insert', function (req, res) {
		
		if(req.body==null){
			res.json('no');
		}
		else{
			console.log('get');
		pool.connect(function(error, client, done) {
		var jsonarray=(req.body);
		for (var i=0;i<jsonarray.length;i++){
			var sst=JSON.stringify(jsonarray[i]);
			console.log(sst);
			
			
			 // insert 数据
			 console.log("INSERT INTO text(everycountry) VALUES (\'"+sst+'\'::json)');
			 client.query("INSERT INTO text(everycountry) VALUES (\'"+sst+'\'::json)').then(res=>{
			 console.log("Insert Success")
			 // 如果是自增ID，有返回值的，在res里
			 return res;
			
			 })
		}
		})
		res.json(req.body);}
});
app.use('/index', function (req, res) {
		fs.readFile('./index.html',function(err,data){
            if(err){
                throw err;
            }else{
                res.end(data);
            }
        });
        res.setHeader('Content-Type','text/html');
		
});
    app.use('/insert2', function (req, res) {
		
		if(req.body==null){
			res.json('no');
		}
		else{
			console.log('get');
		pool.connect(function(error, client, done) {
		var jsonarray=(req.body);
		for (var i=0;i<jsonarray.length;i++){
			var sst=JSON.stringify(jsonarray[i]);
			console.log(sst);
			
			
			 // insert 数据
			 console.log("INSERT INTO allinall(everycountry) VALUES (\'"+sst+'\'::json)');
			 client.query("INSERT INTO allinall(everycountry) VALUES (\'"+sst+'\'::json)').then(res=>{
			 console.log("Insert Success")
			 // 如果是自增ID，有返回值的，在res里
			 return res;
			
			 })
		}
		})
		res.json(req.body);}
});
	app.use('/insert3', function (req, res) {
		
		if(req.body==null){
			res.json('no');
		}
		else{
			console.log('get');
		pool.connect(function(error, client, done) {
		var jsonarray=(req.body);
		for (var i=0;i<jsonarray.length;i++){
			var sst=JSON.stringify(jsonarray[i]);
			console.log(sst);
			
			
			 // insert 数据
			 console.log("INSERT INTO chart(date) VALUES (\'"+sst+'\'::json)');
			 client.query("INSERT INTO chart(date) VALUES (\'"+sst+'\'::json)').then(res=>{
			 console.log("Insert Success")
			 // 如果是自增ID，有返回值的，在res里
			 return res;
			
			 })
		}
		})
		res.json(req.body);}
});
	app.use('/query', function (req, res) {
		var rr;
		pool.connect(function(error, client, done) {
			console.log('get');
		var jsonarray=new Array();
		// query 数据
		console.log("select * from text");
		 client.query("select * from text", [], function(err, response) {
        done();
		var a1=response.rows;
		console.log(a1[1].everycountry);
		for (var i=0;i<a1.length;i++)
		{
			//console.log(a1[i].everycountry);
			jsonarray.push(a1[i].everycountry);
		}
         
		res.json(jsonarray);			// 根据SQL语句查出的数据
    })
			 //console.log(rr.rows);
		
		})
		});
		app.use('/query1', function (req, res) {
		var rr;
		pool.connect(function(error, client, done) {
			console.log('get');
		var jsonarray=new Array();
		// query 数据
		console.log("select * from allinall");
		 client.query("select * from allinall", [], function(err, response) {
        done();
		var a1=response.rows;
		console.log(a1[1].everycountry);
		for (var i=0;i<a1.length;i++)
		{
			//console.log(a1[i].everycountry);
			jsonarray.push(a1[i].everycountry);
		}
         
		res.json(jsonarray);			// 根据SQL语句查出的数据
    })
			 //console.log(rr.rows);
		
		})
		});
		app.use('/query3', function (req, res) {
		var rr;
		pool.connect(function(error, client, done) {
			console.log('get');
		var jsonarray=new Array();
		// query 数据
		console.log("select * from chart");
		 client.query("select * from chart", [], function(err, response) {
        done();
		var a1=response.rows;
		console.log(a1[1].date);
		for (var i=0;i<a1.length;i++)
		{
			//console.log(a1[i].everycountry);
			jsonarray.push(a1[i].date);
		}
         
		res.json(jsonarray);			// 根据SQL语句查出的数据
    });})
		});
		app.use('/queryuser', function (req, res) {
		var rr;
		var re=req.body;
		pool.connect(function(error, client, done) {
			console.log('get');
		
		// query 数据
		console.log("select * from users where users="+'\''+re.id+'\'');
		 client.query("select * from users where users="+'\''+re.id+'\'', [], function(err, response) {
        done();
		var a1=response.rows;
		console.log(a1);
		if(a1[0].pwd==re.pwd)
		{
			
			
			/* fs.readFile('./index.html',function(err,data){
            if(err){
                throw err;
            }else{
                res.end(data);
            }
        });
        res.setHeader('Content-Type','text/html'); */
		  res.redirect('/index'); 
			
		}
         
					// 根据SQL语句查出的数据
    });})
		});
//app.listen(3100,'127.0.0.1');
console.log('Listening on port 3000...');