var express = require('express');
var router = express.Router();

var books = [{id:1, name: "SE", author: "Sravya", rating:10},
			 {id:2, name:"DC", author: "Pear", rating:8}];

router.get('/',function(req,res){
	res.json(books);
});

router.get('/:id([0-9]{1,})', function(req,res){
	var book1=books.filter(function(book){
		if(book.id == req.params.id){
			return true;
		}
	});
	if(book1.length == 1){
		res.json(book1[0]);
	}
	else{
		res.status(404);
		res.send("book not found");
	}
});

router.post('/',function(req,res){
	if(!req.body.name || !req.body.author ||
!req.body.rating){
	res.status(400);
	//res.json({message:"Bad Request"});
}
	else{ 
	console.log(req.body.name);
	  var newBook = books[books.length-1].id+1;
	  books.push({
		  id:newBook,
		  name:req.body.name,
		  author:req.body.author,
		  rating:req.body.rating
	  });
	  res.json(books);
	  //res.send("New Book created");
	  //res.json({message:"new book created", 
	 // location:"/books/"+newBook});
	}
});

router.put('/:id',function(req,res){
	if(!req.body.name || !req.body.author ||
!req.body.rating || !req.params.id){
	res.status(400);
	//res.json({message:"Bad Request"});
}
	else{ 
	
	  var newIndex = books.map(function(book){
		  return book.id;
	  }).indexOf(parseInt(req.params.id));
	  
	  if(newIndex===-1){
	  books.push({
		  id:req.params.id,
		  name:req.body.name,
		  author:req.body.author,
		  rating:req.body.rating
	  });
	  res.json(books);
	}
		else{
			books[newIndex]={
				id:req.params.id,
				name:req.body.name,
				author:req.body.author,
				rating:req.body.rating
		};
		res.json(books);
	}
	  
		}
});

router.delete('/:id',function(req,res){
	if(!req.body.name || !req.body.author ||
!req.body.rating || !req.params.id){
	res.status(400);
	//res.json({message:"Bad Request"});
}
	else{ 
	
	  var newIndex = books.map(function(book){
		  return book.id;
	  }).indexOf(parseInt(req.params.id));
	  
	  if(newIndex===-1){
	  console.log("Item not found");
	  res.json(books);
	}
		else{
			books.splice(newIndex,1);
			res.json(books);
	}
	  
		}
});
			

			 
module.exports = router;