//defining setup for express
const express=require('express');
const path=require('path');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
//const db=require('./config/mongoose');

//for using layout
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//for using view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('./assets'));
// app.use(express.urlencoded());

var bodyParser = require('body-parser');
// parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(bodyParser.urlencoded({ extended: false }));
// combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(bodyParser.urlencoded({ extended: true }));

var toDoList=[];
//for sending data from server side to html
app.get('/todo',function(req,res){
    return res.render('todo',{
        title:"TODO LIST",
        todolist:toDoList
    });
})
//receiving data from the user
app.post('/todo',function(req,res){
   toDoList.push({
       description:req.body.description,
       category:req.body.category,
       tododate:req.body.tododate
      
   });
   return res.redirect('/todo');
})
//deleting user detail
app.get('/delete/:description',function(req,res){
   // console.log(req.params);
    let desc=req.params.description;
   // let date_totel=req.params.tododate;

    let index=toDoList.findIndex(des=>{
        (des.description==desc)
    }

  
    );
    if(index!=-1){
        //console.log(index);
        toDoList.splice(index,1);
    }
    return res.redirect('back');
    // return res.render('todo',{
    //     title:"TODO LIST",
    //     todolist:toDoList

       
    // });
})
// app.use('/',require('./routes'));


//app.set('views','./views');


app.listen(port,function(err){
    if(err)  
    console.log(`Error in running the server:${port} `);

    console.log(`server is running on port ${port}`);
});