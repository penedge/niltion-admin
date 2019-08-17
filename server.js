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
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/penedgeDB1234', { useNewUrlParser: true });
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

    //Enabling CORS
    server.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    // determine upload folder
    const userStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/static/images/admin/profile_image/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    });
    const blogStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/static/images/admin/content/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    });
    const uploadProfile = multer({ storage: userStorage });
    const uploadPost = multer({ storage: blogStorage });
    // Schema
    const User = require('./static/schema/user.model');
    const Blog = require('./static/schema/blog.model');

    // Authentication API
    server.post('/register', uploadProfile.single("profileImage"), (req, res) => {
        const newUser = new User();
        newUser.email = req.body.email;
        newUser.username = req.body.username;
        newUser.password = jwt.sign(req.body.password, req.body.username);
        newUser.profileImage = req.file.originalname;
        newUser.image = req.file.filename;
        newUser.save((err, newUser) => {
            if (!err) {
                res.redirect('/admin')
            }
        });
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
    passport.serializeUser(function (user, done) {
        //console.log('user', user);
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        // console.log('obj', obj);
        done(null, obj);
    });
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user || !user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect username or password' });
                }
                return done(null, user);
            });
        }
    ));
    server.post('/login', (req, res) => {
        if (!req.body.username || !req.body.password) {
            res.redirect('/admin')
        }
        else {
            res.send(user);
        }
    });
    // logout from system
    server.get('/logout', function (req, res) {
        req.logout();
    });
    // Blog API
    server.post('/blog', uploadPost.fields([{ name: 'cover' }, { name: 'multiFile' }]), (req, res) => {
        const blog = new Blog();
        blog.cover = req.files.originalname;
        blog.image = req.body.image;
        blog.title = req.body.title;
        blog.content = req.body.content;
        blog.author = req.body.author;
        blog.category = req.body.category;
        blog.multiFile = req.files.originalname;
        blog.albums = req.body.albums;
        blog.date = req.body.date;
        blog.save((err, newBlog) => {
            if (err) {
                res.redirect('/admin')
            }
            else {
                res.send(newBlog)
            }
        });
    });
    //update Blog Data
    server.put('/ChangeCoverBlog/:id', uploadPost.fields([{ name: 'cover' }]), (req, res) => {
        const id = req.params.id;
        Blog.findByIdAndUpdate({ _id: id }, {
            $set: {
                cover: req.files.originalname,
                image: req.body.image
            }
        }, (err, admin) => {
            res.send(admin);
        });
    });
    server.put('/ChangeTitleBlog/:id', (req, res) => {
        const id = req.params.id;
        Blog.findByIdAndUpdate({ _id: id }, {
            $set: {
                title: req.body.title
            }
        }, (err, admin) => {
            res.send(admin);
        });
    });
    server.put('/ChangeContentBlog/:id', (req, res) => {
        const id = req.params.id;
        Blog.findByIdAndUpdate({ _id: id }, {
            $set: {
                content: req.body.content
            }
        }, (err, admin) => {
            res.send(admin);
        });
    });
    server.put('/ChangeCategoryBlog/:id', (req, res) => {
        const id = req.params.id;
        Blog.findByIdAndUpdate({ _id: id }, {
            $set: {
                category: req.body.category
            }
        }, (err, admin) => {
            res.send(admin);
        });
    });
    server.put('/ChangeAlbumsBlog/:id', uploadPost.fields([{ name: 'multiFile' }]), (req, res) => {
        const id = req.params.id;
        Blog.findByIdAndUpdate({ _id: id }, {
            $set: {
                multiFile: req.files.originalname,
                albums: req.body.albums
            }
        }, (err, admin) => {
            res.send(admin);
        });
    });
    /*
                cover: req.files.originalname,
                image: req.body.image,
                title: req.body.title,
                content: req.body.content,
                author: req.body.author,
                category: req.body.category,
                multiFile: req.files.originalname,
                albums: req.body.albums,
                date: req.body.date
    */
    //update user infomation
    server.put('/changeProfileImage/:id', uploadProfile.fields([{ name: 'profileImage' }]), (req, res) => {
        const id = req.params.id;
        User.findByIdAndUpdate({ _id: id }, {
            $set: {
                profileImage: req.files.originalname,
                image: req.body.image
            }
        }, (err, updateInfo) => {
            if (err) {

            }
            else {
                res.send(updateInfo)
            }
        });
    })
    server.put('/changeUsername/:id', (req, res) => {
        const id = req.params.id;
        User.findByIdAndUpdate({ _id: id }, {
            $set: {
                username: req.body.username
            }
        }, (err, updateInfo) => {
            if (err) {

            }
            else {
                res.send(updateInfo)
            }
        });
    })
    server.put('/changePassword/:id', (req, res) => {
        const id = req.params.id;
        User.findByIdAndUpdate({ _id: id }, {
            $set: {
                password: jwt.sign(req.body.password, req.body.username)
            }
        }, (err, updateInfo) => {
            if (err) {

            }
            else {
                res.send(updateInfo)
            }
        });
    })

    //query by id
    server.get('/blog/:author', (req, res) => {
        const author = req.params.author;
        Blog.find({ author }, (err, admin) => {
            if (err) {
                res.redirect('/admin');
            }
            else {
                res.send(admin)
            }
        });
    });
    // delete blog
    server.delete('/blog/:id', (req, res) => {
        const id = req.params.id;
        Blog.findByIdAndDelete({ _id: id }, (err, admin) => {
            res.send(admin);
        });
    })
    // running server
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