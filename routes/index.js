const express=require('express');

const router =express.Router();

const todoController=require('../controllers/todo_controllers');


router.get('/',todoController.todo);
module.exports=router;