const express = require('express');
const { createMark, getMark } = require('../../controller/markController');
const markerrouter = express.Router();

markerrouter.get('/', (req, res, next) => {
    res.send("root route");
});

markerrouter.post("/newmark",createMark)

markerrouter.get("/getmarked",getMark)

// router.put("/markdone/:id",doneTask)

// router.put("/edit/:id",editTask)

// router.delete("/deletetask/:id",deleteTask)


module.exports ={markerrouter};
