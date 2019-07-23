// import
const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/react_auth');
const multer = require('multer');
const passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const jwt = require('jsonwebtoken');
// API
app.prepare().then(() => {
    const server = express();
    // setpermission
    server.use(cors({ origin: true }));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(passport.initialize());
    server.use(passport.session());
    // determine upload folder
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/static/images/profileImage/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    });
    let upload = multer({ storage: storage });

    // model schema
    const User = require('./static/schema/user.model');

    // Register & Upload Image API
    server.post('/register', upload.single("profileImage"), (req, res) => {
        if (Object.keys(req.body.username).length > 8 || Object.keys(req.body.password).length > 8 || Object.keys(req.body.email).length > 8) {
            let newUser = new User();
            newUser.email = req.body.email;
            newUser.username = req.body.username;
            newUser.password = jwt.sign(req.body.password, req.body.username);
            newUser.profileImage = req.file.originalname;
            newUser.image = req.file.filename;
            newUser.save((err, newUser) => {
                if (!err) {
                    res.redirect('/')
                }
            });
        }
    });
    server.get('/register', (req, res) => {
        mongoose.model('User').find().exec((err, user) => {
            if (err) {
                res.status(404).send('404 NOT FOUND!')
            }
            else {
                res.send(user);
            }
        });
    });
    // find info by username
    server.get('/register/:username', (req, res) => {
        const username = req.params.username;
        User.findOne({ username }, (err, user) => {
            res.send(user);
        });
    })
    //Checked username & password before authentication
    passport.serializeUser(function(user, done) {
        //console.log('user', user);
        done(null, user);
    });
    
    passport.deserializeUser(function(obj, done) {
        // console.log('obj', obj);
        done(null, obj);
    });
    passport.use(new LocalStrategy(
        function(username, password, done) {
          User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user || !user.validPassword(password)) {
              return done(null, false, { message: 'Incorrect username or password' });
            }
            return done(null, user);
          });
        }
    ));
    server.post('/login', (req, res)=> {
        if (!req.body.username || !req.body.password) {
            res.redirect('/')
        } 
        else {
            res.send(user);
        }
    });
    // logout from system
    server.get('/logout', function(req, res){
        req.logout();
    });
    server.get('*', (req, res) => {
        return handle(req, res)
    });
    server.listen(PORT, err => {
        if (err) {
            throw err
        }
        console.log(`> Ready on http://localhost:${PORT}`)
    })
});