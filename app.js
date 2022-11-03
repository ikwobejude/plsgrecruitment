const compression = require('compression');
const express = require('express');
let cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const session = require('express-session');



// routes 

const auth = require('./src/routes/auth');
// const admin = require('./src/routes/admin');
const admin = require('./src/routes/admin');
const api = require('./src/routes/api');
const agency = require('./src/routes/agency');
const client = require('./src/routes/client');
const mandate = require('./src/routes/mandate');
const receipt = require('./src/routes/receipt');
const { requireAuth, checkUser } = require('./src/middleware/authMiddleware');
const self = require('./src/routes/selfassessment');
const { organization } = require('./src/model/applicant');




const app = express();

// app.use(compression())
// app.use(express.urlencoded());
app.use(express.json())
app.use(cors());

app.use(cookieParser())
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: process.env.SESSION_SECRECT,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3
    }
  }));





app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.get("*", function(req, res, next){
  //res.locals.cart = req.session.cart;
  res.locals.link = req.originalUrl.split("?")[0]
  next();
});

// static files
app.use(express.static('public'));
app.use(express.static('uploads'));






//view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')




app.use(checkUser)
app.get('/', async (req, res) => {
  let organiz = await organization.findAll()
    res.render('index', {organiz})
})
app.post('/', async (req, res) => {
  let organiz = await organization.findAll()
    res.render('index', {organiz})
})





function main() {
    let PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log("APP RUNNING ON PORT", PORT)
    })

    app.use(auth);

    app.use('/admin', requireAuth, admin);
    app.use(api);
    app.use('/agency', agency);
    app.use('/client', client);
    app.use('/generate', requireAuth, mandate);
    app.use( requireAuth, receipt);
    app.use('/self/assessment', requireAuth, self);

}

main();
