const express = require('express');
const { userSignup, userLogin } = require('../../controller/userController');
const userrouter = express.Router();

userrouter.get('/', (req, res, next) => {
    res.send("root route");
});

userrouter.post("/signup",userSignup)

userrouter.post("/login",userLogin)

// router.put("/markdone/:id",doneTask)

// router.put("/edit/:id",editTask)

// router.delete("/deletetask/:id",deleteTask)


module.exports = {userrouter};
