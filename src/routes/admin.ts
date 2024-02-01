import { Router} from 'express';
const adminController = require('../controllers/adminController');
const { ensureAuth, ensureGuest,ensureAuthAdmin, ensureAuthNotAdmin} = require('../middleware/auth')
const router: Router = Router(); 

router.get('/', ensureAuthAdmin, adminController.home);
router.get('/market', ensureAuthAdmin, adminController.market);
router.get('/transactions', ensureAuthAdmin, adminController.transactions);
router.get('/add_rules', ensureAuthAdmin, adminController.add_rules);
router.get('/rules', ensureAuthAdmin, adminController.rules);
router.get('/wallet', ensureAuthAdmin, adminController.wallet);
router.post('/add_rules',ensureAuthAdmin, adminController.save);

export default router;