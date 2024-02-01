import { Router } from 'express';
const ruleController = require('../controllers/ruleController');
const router: Router = Router();

const passport = require('passport');
require("../config/passport")(passport);
const cookieParser = require('cookie-parser')

router.get('/', passport.authenticate('jwt', { session: false, failureRedirect: '/' }), ruleController.index);
router.post('/execute', passport.authenticate('jwt', { session: false, failureRedirect: '/' }), ruleController.execute);

export default router;