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
const eventRoute = require('./routes/event')
const guardedRoutes = require('./routes/guarded')
var exphbs = require('express-handlebars');

app.use(
	session({
		secret: 'fraggle-rock', 
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
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes)
app.use('/user', userRoute)
app.use('/dashboard', guardedRoutes)
app.use('/event', eventRoute)

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
