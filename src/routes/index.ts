import { Router, Request, Response, NextFunction} from 'express';
import user from '../models/classes/user';
const passport = require('passport');
require("../config/passport")(passport);
const cookieParser = require('cookie-parser');

const indexController = require('../controllers/indexController');
const { ensureAuth, ensureGuest,ensureAuthAdmin, ensureAuthNotAdmin} = require('../middleware/auth')

const router: Router = Router();

router.use(cookieParser());

router.use(checkToken);

router.get('/', ensureGuest, indexController.login);
router.post('/login',ensureGuest,indexController.validateLogin)
router.get('/register', ensureGuest, indexController.register);
router.post('/register', ensureGuest,indexController.validateRegister);
router.get('/home', passport.authenticate('jwt', { session: false, failureRedirect: '/' }), indexController.home);

export default router;

function checkToken (req: Request, res: Response, next: NextFunction) {
	const token = req.cookies.token
	if (token) {
		req.headers.authorization = `Bearer ${token}`
	}
	next()
}