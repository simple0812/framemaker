var router = express.Router();
var apiCtrl = require('../controllers/article');

router.get('/article/v', apiCtrl.render);

router.get('/articles', apiCtrl.retrieve);
router.get('/articles/page', apiCtrl.page);
router.post('/article', apiCtrl.create);
router.put('/article', apiCtrl.update);
router.delete('/article', apiCtrl.delete);

module.exports = router;