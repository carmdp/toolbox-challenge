var express = require('express');
var router = express.Router();
var filesController = require('../controllers/filesControllers');


router.get('/files/list', filesController.GetListFiles);
router.get('/files/data', filesController.GetDataFiles);




module.exports = router;
