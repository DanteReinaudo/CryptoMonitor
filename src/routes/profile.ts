import { Router} from 'express';
const profileController = require('../controllers/profileController');
const { ensureAuth, ensureGuest,ensureAuthAdmin, ensureAuthNotAdmin} = require('../middleware/auth')
const router: Router = Router(); 

const passport = require('passport');
require("../config/passport")(passport);
const cookieParser = require('cookie-parser')

router.get('/', passport.authenticate('jwt', { session: false, failureRedirect: '/' }), profileController.index);


export default router;