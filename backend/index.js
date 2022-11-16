const express=require("express");
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
const app=express();
const cors=require('cors');
app.use(cors());
app.use(express.json());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));



const keeperappSchema = {
      title: String,
     content:String
  };
  const Keeper = mongoose.model("Keeper", keeperappSchema);
  mongoose.connect("mongodb://localhost:27017/keepDB");
 



app.post('/api/',(req,res)=>{
       
        const note = new Keeper({
          title: req.body.title,
          content: req.body.content
        });
        note.save(function(err,result) {
          if (!err) {
            res.redirect('/')
            console.log(result);
            
          }
          else{
            console.log(" not found ");
          }
        });
});


app.listen(3001, function (req, res) {
    console.log("Server has Started successfully");
  });
  