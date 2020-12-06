const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const URLModel = require('./Models/URL')
const mongoose = require('mongoose')
const codeGenerator = require('./utils/codeGenerator');
const bcrypt = require('bcrypt');
let generatedCodes = []
bcrypt.genSalt(10,function(err,salt){
  bcrypt.hash("abc",salt,function(err,hash){
    console.log(hash);
  })
})
mongoose.connect('mongodb+srv://vinayak:vinayak123@cluster0.7eax6.mongodb.net/Cluster0?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true}).
then(()=>{
  console.log("sucesss")
}).catch((err)=>{
  console.log(err)
})

function  validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

app.use(express.static(publicPath));
app.use(express.json())
app.set("views",path.join(__dirname,'views'))
app.set("view engine","ejs")

app.post('/shorten',(req,res)=>{
  if(!validURL(req.body.url.trim()))
  {
    res.status(422)
  res.json("invalid url")
  }
  else{
  let tempURL= req.body.url.trim();
  if(tempURL[tempURL.length-1]!="/")
  {
    tempURL=tempURL+"/";
  }
  console.log(req.body)
 URLModel.findOne({URL:tempURL}).then((doc)=>{
  if(doc)
  {
    res.json({shortURL:"https://sleepy-ravine-77519.herokuapp.com/"+doc.code})
  }
  else{
    let code;
   
    do{
      code = codeGenerator();
      console.log("do while",code)
    }
    while(
      URLModel.exists({code:code},function(err,msg)
      {
        if(err)
        {
          console.log(err)
        }
        else
        {
        console.log(msg);
        }
      })
    )
   
    console.log( )
   
    new URLModel({code:code,URL:tempURL,count:0}).save().then(()=>{
      console.log("saved doc sucessfully!")
      res.json({shortURL:"https://sleepy-ravine-77519.herokuapp.com/"+code})
    }).catch((err)=>{
      console.log(err)
    })
  }
 }).catch((err)=>{
   console.log(err)
 })
  
 // res.json("some data");
}
  
})
app.get('/admin',(req,res)=>{

    res.sendFile(path.join(publicPath,"admin.html"));

})
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});
app.get("/:code",(req,res)=>{
  URLModel.findOne({code:req.params.code}).then((data)=>{
        if(data)
        {
          res.render("Timer",{URL:data.URL});
         console.log("",data.count,data)
        
          URLModel.updateOne({code:data.code},{$set:{"count":data.count+1}}).then((data)=>{

            console.log("count updated for request!")
           
          }).catch((err)=>console.log("Error while updating the count of document!",err))
      //  res.redirect(data.URL)
        }
        else{
          res.redirect("/")
        }
  })
});
app.get('/URLsData/:pageNumber',(req,res)=>{


        URLModel.find({}).sort({count:"desc"}).skip((req.params.pageNumber-1)*10).limit(50).then((data)=>{
          res.json(data)
        }).catch((err)=>{
          res.status(400)
          console.log(err)
        })
})
app.listen(port, () => {
  console.log('Server is up!');
});
