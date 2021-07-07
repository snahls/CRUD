var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/harshith',
{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});

var bookSchema = new mongoose.Schema({
  pid:String,  
  name:String,
  author:String,
  rating:String
});

const Book=new mongoose.model('Book', bookSchema);

router.get('/get',async(req,res)=>{
    try {
        const books = await Book.find()
        res.json(books)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
   
})

router.get('/get/:pid([0-9]{1,})',async(req,res)=>{
    const book=await Book.find({pid:req.params.pid});
	res.json(book);
	
})

router.post('/post',async(req,res)=>{
    const book= new Book({
        pid:req.body.pid,
        name:req.body.name,
        author:req.body.author,
        rating:req.body.rating
    })
    try {
        const newBook = await book.save()
        res.status(201).json(newBook)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
	
});

router.put('/put/:pid',async(req,res)=>{
        await Book.findOneAndUpdate({pid:req.params.pid},req.body,function(err,up){
            res.send("Updated");
        })
		
});

router.delete('/del/:pid',async(req,res)=>{
    try {
        await Book.deleteOne({pid:req.params.pid})
        res.json({ message: 'Deleted ' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }

    
});
						 
module.exports = router;