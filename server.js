require("dotenv").config();
const express = require("express");
const session = require('express-session')
const path = require('path')
const dbConnection = require('./database')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const PORT = process.env.PORT || 8080;
const app = express();
const userRoute = require('./routes/user')
const routes = require('./routes/index')
const eventRoutes = require('./routes/event')
const guardedRoutes = require('./routes/guarded')
const clientRoutes = require('./routes/client')
var exphbs = require('express-handlebars');
var hbs = require('handlebars')

app.use(
	session({
		secret: process.env.APP_SECRET,
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)
app.use(passport.initialize())
app.use(passport.session())
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
hbs.registerHelper('thisMonth', function (arg1, options) {
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var now = new Date();
	var thisMonth = months[now.getMonth()];
	return (arg1 == thisMonth) ? options.fn(this) : options.inverse(this);
});
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes)
app.use('/user', userRoute)
app.use('/dashboard', guardedRoutes)
app.use('/event', eventRoutes)
app.use('/client', clientRoutes)

app.listen(PORT, function () {
	console.log(`🌎 ==> Server now on port ${PORT}!`);
});
