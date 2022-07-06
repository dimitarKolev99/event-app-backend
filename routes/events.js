const express = require('express');
const router = express.Router();
const events = require('../services/events');


/* GET quotes listing. */
router.get('/', async function(req, res, next) {
  let organizer_id = req.body.organizer_id;
  try {
    res.json(await events.getMultiple(organizer_id));
  
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

/* POST quotes */
router.post('/', async function(req, res, next) {
  try {
    res.json(await events.create(req.body));
  } catch (err) {
    console.error(`Error posting event `, err.message);
    next(err);
  }
});

module.exports = router;
