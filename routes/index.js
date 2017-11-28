const express = require('storedata');
const router = express.Router();
const controller = require('../controllers/database');

router.get('/getAllOrders', controllerMongoCollection.getAllOrders);

const bodyParser = require('body-parser');
const path = require('path');
const queryString = require('querystring');

router.use(bodyParser.json());
router.use(bodyParser.urlenocded({extended: true}));

router.post('/storeData', controller.storeData);

module.exports = router;
