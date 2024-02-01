import { Router} from 'express';
const variableController = require ('../controllers/variableController');
const router: Router = Router(); 


const passport = require('passport');
require("../config/passport")(passport);
const cookieParser = require('cookie-parser')


router.get('/', passport.authenticate('jwt', { session: false, failureRedirect: '/' }), variableController.index);
router.get('/add', passport.authenticate('jwt', { session: false, failureRedirect: '/' }), variableController.add);
router.post('/add',passport.authenticate('jwt', { session: false, failureRedirect: '/' }) ,variableController.save);


export default router;