const express = require('express');
const { createMark, getMark, cancelMark } = require('../../controller/markController');
const markerrouter = express.Router();

markerrouter.get('/', (req, res, next) => {
    res.send("root route");
});

markerrouter.post("/newmark",createMark)

markerrouter.get("/getmarked",getMark)

// router.put("/markdone/:id",doneTask)

// router.put("/edit/:id",editTask)

markerrouter.delete("/cancelmark/:date",cancelMark)


module.exports ={markerrouter};
