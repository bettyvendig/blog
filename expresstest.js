const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
//const dbURI = 'mongodb+srv://betty:<password>@cluster0.cc5l9.mongodb.net/<dbname>?retryWrites=true&w=majority'
const app = express();
const dbURI = 'mongodb+srv://betty:BBue123456@cluster0.cc5l9.mongodb.net/blogsDG?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useUnifiedTopology:true,useNewUrlParser:true})
.then(function(result){
	/*console.log(result);*/
	console.log('connected to blogDB');
	app.listen(5000);
}).catch(function(err){
	/*console.log(err);*/
	console.log('error connecting');
});

app.set('view engine','ejs');
/*app.listen(3000);*/

// middleware and static
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
/*
app.get('/add-blog',function(req,res){
	const blog = new Blog({
		title:'blog title2',
		snippet:'my other snippet',
		body:'body of my snippet'
	});
	blog.save()
	.then(function(result){
		res.send(result);
	})
	.catch(function(err){
		console.log(err);
	});


});
app.get('/all-blogs',function(req,res){
	Blog.find()
	.then(function(results){
		res.send(results);
	})
	.catch(function(err){
		res.send(err);
	});
});
app.get('/single-blog',function(req,res){
	Blog.findById("6026c44886b1194660404b3f")
	.then(function(result){
		res.send(result);
	})
	.catch(function(result){
		res.send(result);
	});
});

*/

app.use(function(req,res,next){
 console.log(req.hostname);
 console.log(req.path);
 console.log(req.method);
 next();
});
app.use(function(req,res,next){
 console.log('next');

 next();
});



app.get('/', function (req, res) {
	/*var blogs = [
	{title:'title1',snippet:'snippet'},
	{title:'title2',snippet:'snippet'},
	{title:'title3',snippet:'snippet'},
	{title:'title4',snippet:'snippet'},

	];*/
	res.redirect('/blogs');
	

  res.render('index',{title:'home', misc:'miscellaneous',blogs:blogs});
})
app.get('/about', function (req, res) {
  console.log(req.baseUrl);

  res.render('about',{title:'about'});
  
})

app.get('/blogs',function(req,res){
	Blog.find().sort({createdAt:-1})
	.then(function(result){
		res.render('index',{title:'all of my blogs',blogs:result})
	})
	.catch(function(result){
		res.send(result);
	});


});
app.post('/blogs',function(req,res){
	console.log(req.body);
	
	const blog = new Blog(req.body)
	blog.save()
	.then(function(result){
		res.redirect('/blogs');
	})
	.catch(function(err){
		console.log(err);
	});
});
app.get('/blogs/create', function (req, res) {
  //console.log(req.baseUrl);
  console.log('create');
  res.render('create',{title:'create'});
  
})
app.get('/blogs/:id',function(req,res){
	const id = req.params.id;
	Blog.findById(id)
	.then(function(results){
		res.render('details',{blog:results,title:id})
	})
	.catch(function(results){
		res.send(results);
	});
});



app.get('/about-us',function(req,res){
	res.redirect('/about');
});
	
app.delete('/blogs/:id',function(req,res){
	const id = req.params.id;
	Blog.findByIdAndDelete(id)
	.then(function(result){
		res.json({redirect:'/blogs'})
	})
	
	.catch(function(result){
		console.log(result);
	});
});

app.use(function(req,res){
	res.status(404).render('404',{title:'404page'});
});



