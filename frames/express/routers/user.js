var router = express.Router();
var apiCtrl = require('../controllers/user');

router.get('/', apiCtrl.render);
router.get('/user/v', apiCtrl.render);

router.get('/users', apiCtrl.retrieve);
router.get('/users/page', apiCtrl.page);
router.post('/user', apiCtrl.create);
router.put('/user', apiCtrl.update);
router.delete('/user', apiCtrl.delete);

module.exports = router;