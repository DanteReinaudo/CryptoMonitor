import { Router} from 'express';
const walletController = require ('../controllers/walletController');
const { ensureAuth, ensureGuest,ensureAuthAdmin, ensureAuthNotAdmin} = require('../middleware/auth')
const router: Router = Router(); 

const passport = require('passport');
require("../config/passport")(passport);
const cookieParser = require('cookie-parser')


router.get('/',passport.authenticate('jwt', { session: false, failureRedirect: '/' }), walletController.index);

export default router;