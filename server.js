const express = require("express");
const session = require('express-session')
// const dbConnection = require('./database') 
const MongoStore = require('connect-mongo')(session)
// const passport = require('./passport');
const PORT = process.env.PORT || 8080;
const app = express();
// const routes = require('./routes')
var exphbs = require('express-handlebars');

// app.use(
// 	session({
// 		secret: 'fraggle-rock', 
// 		store: new MongoStore({ mongooseConnection: dbConnection }),
// 		resave: false, 
// 		saveUninitialized: false 
// 	})
// )
// app.use(passport.initialize())
// app.use(passport.session()) 
app.use(express.static(process.cwd() + '/public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', function (req, res){
	res.render('index');
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
