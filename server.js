
 const express = require('express')
 const app = express();

 const mongoose = require('mongoose');

 var routes = require('./Api/routes/userRoutes.js');



 var port = process.env.PORT || 3000;
 
 mongoose.set('strictQuery', false)
 // you can connect to mongodb with mongoose.connect
 mongoose.connect('mongodb://127.0.0.1/Mini_Project').then
    (function(){
        console.log("Db connection sucessful");
    },function(err){
        console.log(" DB connection failed");
    }
    );
// Body parser used 
    app.use(express.urlencoded({extended:true}));
 app.use(express.json());

 // middleware used
 app.use(function(req,res,next){
    if(req.headers && req.headers.authorization){
        const auth = req.headers.authorization.split(' ');
        console.log(auth);
        if(auth[0]==='JWT'){
            jsonwebtoken.verify(auth[1],'RESTFULAPIs',function(err,decode)  {
                if(err){
                    req.user = undefined;
                    next();
                }
                else{
                    req.user = decode;
                    console.log(decode);
                    next();
                }
            });
        }
        else{
            req.user = undefined;
            next();
        }
    }
    
});
    routes(app);
 app.listen(port ,()=>{
console.log("Appliction server Started at Port" + port);
 });

 module.exports = app; 