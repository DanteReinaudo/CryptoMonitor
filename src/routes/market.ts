import { Router} from 'express';
const marketController = require('../controllers/marketController');
const { ensureAuth, ensureGuest,ensureAuthAdmin, ensureAuthNotAdmin} = require('../middleware/auth')

const passport = require('passport');
require("../config/passport")(passport);
const cookieParser = require('cookie-parser')

const router: Router = Router(); 

router.get('/', ensureAuthNotAdmin, marketController.index);



export default router;