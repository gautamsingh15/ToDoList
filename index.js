const express=require('express');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.static('./assets'));
app.use(express.urlencoded());
var toDoList=[];
app.post('/todo',function(req,res){
   toDoList.push({
       description:req.body.description,
       category:req.body.category,
       tododate:req.body.tododate
      
   });
   console.log(toDoList[0].tododate);
})
app.get('/todo',function(req,res){
    return res.render('todo',{
        title:"TODO LIST",
        todolist:toDoList
    });
})

// app.use('/',require('./routes'));

app.set('view engine','ejs');
//app.set('views','./views');


app.listen(port,function(err){
    if(err)  
    console.log(`Error in running the server:${port} `);

    console.log(`server is running on port ${port}`);
});