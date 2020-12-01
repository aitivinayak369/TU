const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const URLModel = require('./Models/URL')
const mongoose = require('mongoose')
const codeGenerator = require('./utils/codeGenerator')
let generatedCodes = []
mongoose.connect('mongodb+srv://vinayak:vinayak123@cluster0.7eax6.mongodb.net/Cluster0?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true}).
then(()=>{
  console.log("sucesss")
}).catch((err)=>{
  console.log(err)
})


app.use(express.static(publicPath));
app.use(express.json())
app.get("/:code",(req,res)=>{
  URLModel.findOne({code:req.params.code}).then((data)=>{
        if(data)
        {
       res.redirect(data.URL)
        }
        else{
          res.redirect("/")
        }
  })
})
app.post('/shorten',(req,res)=>{
  console.log(req.body)
 URLModel.findOne({URL:req.body.url}).then((doc)=>{
  if(doc)
  {
    res.json({shortURL:"https://sleepy-ravine-77519.herokuapp.com/"+doc.code})
  }
  else{
    let code;
    if(!req.body.url)
       res.json("invalid url")
    do{
      code = codeGenerator();
      console.log("do while",code)
    }
    while(generatedCodes.indexOf(code)!=-1)
   
    generatedCodes.push(code)
    new URLModel({code:code,URL:req.body.url.trim()}).save().then(()=>{
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
  
})

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});
