import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { startBinanceService } from './models/classes/binanceSrv';

//Imports
const dotenv = require('dotenv')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const { keys } = require('./keys');

//Import routes
import IndexRoutes from './routes';
import RulesRoutes from './routes/rules';
import TransactionRoutes from './routes/transactions';
import VariablesRoutes from './routes/variables';
import WalletRoutes from './routes/wallet';
import MarketRoutes from './routes/market';
import AdminRoutes from './routes/admin';


//Load config 
dotenv.config({ path: './config/config.env' })
require('./config/passport')(passport)

//Initializations
const app = express();
require('./database');

//Settings 
app.set("port", process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  helpers: require('./lib/helpers')
}));
app.set('view engine', '.hbs');

//Logs
app.use(morgan("dev"))

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: keys.MONGO_URI, }),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Routes

app.use("/", IndexRoutes)
app.use("/home", IndexRoutes)
app.use("/login", IndexRoutes)
app.use("/register", IndexRoutes)
app.use('/rules', RulesRoutes);
app.use("/transactions", TransactionRoutes)
app.use('/wallet', WalletRoutes);
app.use("/variables", VariablesRoutes)
app.use('/market', MarketRoutes)
app.use('/admin', AdminRoutes)
app.use('/auth', require('./routes/auth'))

//Bynance
startBinanceService();


//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port`, app.get('port'));
});