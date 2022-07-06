var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   res.json({
    message: 'alive'
  });
 
  console.log(req.body);
});

router.get('/users', function(req, res, next) {
  console.log("request");
  res.json([{
    id: 0
  },
  {
    id: 1
  }]);
});

module.exports = router;

