import { Router} from 'express';
const transactionController = require ('../controllers/transactionController');
const router: Router = Router(); 


const passport = require('passport');
require("../config/passport")(passport);
const cookieParser = require('cookie-parser')

router.get('/', passport.authenticate('jwt', { session: false, failureRedirect: '/' }), transactionController.index);

export default router;