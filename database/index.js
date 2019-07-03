//Connect to Mongo database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const uri = 'mongodb://localhost:27017/MyClient'

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {

    mongoose.connect(uri).then(
        () => {
            /** ready to use. */
            console.log('Connected to Mongo');

        },
        err => {
            /** handle initial connection error */
            console.log('error connecting to Mongo: ')
            console.log(err);

        }
    );
}

module.exports = mongoose.connection