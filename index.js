'use strict'
const express  = require('express');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs')
var crypto = require('crypto');
const bodypasser = require('body-parser');
var imgPath = './public/upload/noimage.jpg';
var uploads = {};
const path = require('path').join(__dirname + '/src/assets/images');
const cors = require('cors')
var cloudinary = require('cloudinary').v2;
var imgp;

var female;
app.use(cors({origin:"*"}));
app.use(bodypasser.json())
app.use(express.static(path))
const server = app.listen(process.env.PORT || 1993,(res,err)=>{
  if(err){console.log(err)}
  console.log('started');
  
});
cloudinary.config({ 
  cloud_name: 'paisley', 
  api_key: '395842835474611', 
  api_secret: 'cJQtqbyBmnciQ5Q8ubewrgh-PyE' 
});
    app.get('/',(req,res)=>{
      res.send('home page')
    })

mongoose.connect('mongodb://localhost/local', { useNewUrlParser: true,useUnifiedTopology: true  });
  let user_schema= mongoose.Schema({
    firstname:{type:String,require:true,},
    lastname:{type:String,require:true}, 
    email:{type:String,require:true,unique:true}, 
    password:{type:String,require:true},
    phone:{type:Number,require:true},
    gender:{type:String,require:true},
    image:{type:String,require:true},
  })
  const userModel = mongoose.model('users',user_schema)
  

const io = require('socket.io')(server);
io.on("connection", (socket) => {
  socket.on("users",(data)=>{
    userModel.find((err,users)=>{
    socket.emit("all users",users)
 })
    
  })
        socket.on('signup',(data)=>{

          cloudinary.uploader.upload('pizza.png', { tags: 'profile' }, function (err, image) {
            if (err) { console.warn(err); }
            imgp = image.url;
          });
          let register = new userModel({
            firstname:data.firstname,
            lastname:data.lastname,
            email:data.email,
            password:data.password,
            phone:data.phone,
            gender:data.gender,
            image:imgp,
          })
          register.save();
        // var genderFerify;
        // if(data.gender=='male'){
        //   genderFerify ='/assets/images/no-photo.jpg';
        // }else if(data.gender=="female"){
        //   genderFerify ='/assets/images/Girl.jpg';
        // }
   
        // socket.emit('new user sign up',{firstname:data.firstname,lastname:data.lastname,email:data.email,password:data.password,phone:data.phone,});
    //  fs.readFile('','utf8',function(err, info){
    //   console.log(info)
    //   })
    // if (data.gender==="male") {
      // fs.readFile(__dirname+'/uploading/no-photo.jpg',(err,res)=>{
      //   if(err){console.log(err)}
      //   console.log(res)
      // })     
    // }
    // console.log(img)

  })
 socket.on('login',(data)=>{
  userModel.findOne({email:data.email,password:data.password,},(err,result)=>{
    if (result){ 
      console.log(result)
      socket.emit('new login',{result})
    }
  })
  })
  socket.on('fetchdata',(data)=>{
    userModel.findOne({firstname:data},(err,result)=>{
      if (result){ 
        // console.log(result)
        socket.emit('new data',{result})
      }
    })
    })
  
  socket.on('profileImage',(data)=>{
    console.log(data)
  socket.emit('new profileImage',{image:data.image})
  var newImage = { $set: {image:data.image}};
  userModel.updateOne({firstname:data.username},newImage,(err,result)=>{
    if (result){ 
      console.log(result)
      // socket.emit('new login',{result})
    }
  })
  


})

})
  
function waitForAllUploads(id, err, image) {
  uploads[id] = image;
  var ids = Object.keys(uploads);
  if (ids.length === 6) {
    console.log();
    console.log('**  uploaded all files (' + ids.join(',') + ') to cloudinary');
    performTransformations();
  }
}
