const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const cors = require('cors')
//const User = require('./models/user');
const passport = require('passport');
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const bodyParser = require('body-parser');



dotenv.config()


mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("database connected"))

const User = mongoose.model('User1', {
    username: { type: String },
    password: { type: String }
});


app.use(express.json())
app.use(cors())
app.use('/app', routesUrls)
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }));
require('./config/passport')(passport);
//app.use(express.staticProvider('C:\\Users\\krmay\\Desktop\\send\\signupfront\\public'));
app.get('/login', function (req, res) {
    res.render('index.ejs');

});
app.get('/', function (req, res) {
    res.render('home.ejs');

});
app.post('/login', (req, res) => {
    console.log(typeof User);
    console.log(typeof User.db);
    console.log(req.body.username);
    console.log(req.body.password);
    User.findOne({
        username: req.body.username,
        password: req.body.password
    }, (err, us) => {
        console.log(err);
        console.log(us);
        if (!err) {
            res.render('home.ejs');
            console.log("find user");
        } else {
            console.log(err);
            res.send("no email find");
        }
    })
})
//app.post('/login', function (req, res) {
// res.render('index.ejs');

//});
// app.post('/login', passport.authenticate('local-login', {

//     successRedirect: '/', // redirect to the secure profile section
//     failureRedirect: '/login' // redirect back to the signup page if there is an error
//     //failureFlash: true // allow flash messages
// }));


app.listen(4000, () => console.log("server is up and running"))