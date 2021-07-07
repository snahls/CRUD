var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var connectionString='mongodb://localhost:27017/harshith'
MongoClient.connect(connectionString,{useUnifiedTopology:true},function(err,db){

if(err) console.error(err);
	//console.log("db connected");
	var dbobj=db.db("harshith");


router.get('/get',async(req,res)=>{
    
        await dbobj.collection("books").find({}).toArray(function(err,resp){
            if(err) console.error(err);
        res.send(resp)
        })
        
})

router.get('/get/:pid',async(req,res)=>{
  
    await dbobj.collection("books").findOne({pid:req.params.pid},function(err,resp){
		if(err) console.error(err);
	res.send(resp);
    })
    
})

router.post('/post',async(req,res)=>{
    const book= {
        pid:req.body.pid,
        name:req.body.name,
        author:req.body.author,
        rating:req.body.rating
    }

    dbobj.collection("books").insertOne(book, function(err, resp) {
        if (err) throw err;
        //console.log("inserted");
    });
   res.json("inserted");
	
});

router.put('/put/:pid',async(req,res)=>{

        await dbobj.collection("books").updateOne({pid:req.params.pid},{$set:{name:req.body.name,author:req.body.author,
        rating:req.body.rating}},function(err,res){
                if(err) console.error(err);
            //console.log("updated");
        })
		res.json("updated")
});

router.delete('/del/:pid',async(req,res)=>{
    try {
        await dbobj.collection("books").deleteOne({pid:req.params.pid})
        res.json({ message: 'Deleted ' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }

    
});
})
						 
module.exports = router;