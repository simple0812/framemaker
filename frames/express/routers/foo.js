var router = express.Router();
var apiCtrl = require('../controllers/foo');

router.get('/foo', apiCtrl.retrieve);

module.exports = router;