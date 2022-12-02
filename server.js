var express = require('express');
var app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require("path");
const server = require('http').createServer(app);
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;

const sessionMiddleware = session({ secret: "changeit", resave: false, saveUninitialized: false });
app.use(sessionMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
//app
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/carreira', express.static(path.join(__dirname, 'public')))
app.use('/frequencia', express.static(path.join(__dirname, 'public')))
app.use('/faq', express.static(path.join(__dirname, 'public')))
app.use('/tickets', express.static(path.join(__dirname, 'public')))
app.use('/faq/edit', express.static(path.join(__dirname, 'public')))
app.use('/tickets/ticketsEspecifico', express.static(path.join(__dirname, 'public')))
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(urlencodedParser);

//Faq routes and use them as middleware, i.e. every time a request url matches '/faqs' the appropriate route will be followed according to the HTTP verb (app.get/post/put/patch/delete)
const faqRoutes = require('./routes/faqs');
app.use('/faq', faqRoutes);
const ticketRoutes = require('./routes/tickets');
app.use('/tickets', ticketRoutes)
const Faq = require("./models/faq");
// carreira
const carreiraRoutes = require('./routes/carreira');
app.use('/carreira', carreiraRoutes);
const carreira = require("./models/carreira");

// frequencia
const frequenciaRoutes = require('./routes/frequencia');
app.use('/frequencia', frequenciaRoutes);
const frequencia = require("./models/frequencia");

//User routes and use them as middleware, i.e. every time a request url matches '/users' the appropriate route will be followed according to the HTTP verb (app.get/post/put/patch/delete)
const userRoutes = require('./routes/users');
app.use('/user', userRoutes);
const mongoose = require('mongoose');
const User = require("./models/user");
const userController = require("./controllers/userController");
const login =  User.userModel();
var numAgentes = 0;

passport.use(new LocalStrategy(
    function(username, password, done) {
        login.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (user.password != password) { return done(null, false); }
            numAgentes++;
            return done(null, user);
        });
    }
));

passport.serializeUser((user, cb) => {
    console.log(`serializeUser ${user.id}`);
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    console.log(`deserializeUser ${id}`);
    login.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

//Página Inicial
app.get('/', function (req, res){
    const isAuthenticated = !!req.user;
    if (isAuthenticated) {
        console.log(`user is authenticated, session is ${req.session.id}`);
    } else {
        console.log("unknown user");
    }
    res.render('home',{isAuthenticated});
});

//Página de atendimento
app.get('/atendimento',jsonParser, function (req, res){
    userController.userListAtend(req,res);
});
//Página de login
app.get('/login/', function (req, res){
    const cont = req.user;
    res.render('login',{cont : cont});
});
//Logout
app.post("/logout", (req, res) => {
    console.log(`logout ${req.session.id}`);
    const socketId = req.session.socketId;
    if (socketId && io.of("/").sockets.get(socketId)) {
        console.log(`forcefully closing socket ${socketId}`);
        io.of("/").sockets.get(socketId).disconnect(true);
    }
    numAgentes--;
    req.logout();
    res.cookie("connect.sid", "", { expires: new Date() });
    res.redirect("/");
});
app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/", 
        failureRedirect: "/login",
    })

);
//Página de signup
app.get('/signup/', function (req, res){
    res.render('signup',{});
});

app.post("/signup",function(req,res){

    //New User in the DB
    const instance = new login({ username: req.body.username, password: req.body.password, email: req.body.email });
    instance.save(function (err, instance) {
        if (err) return console.error(err);

        //Let's redirect to the login post which has auth
        res.redirect(307, '/login');
    });
});

const io = require('socket.io')(server);
var people = {};


// convert a connect middleware to a Socket.IO middleware
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
    if (socket.request.user) {
        next();
    } else {
        next()
    }
});

io.on('connect', (socket) => {

    //Chat
    if (socket.request.user) {
        console.log(`new connection ${socket.id}`);
        socket.on('whoami', (cb) => {
            cb(socket.request.user.username);
        });

        const session = socket.request.session;
        console.log(`saving sid ${socket.id} in session ${session.id}`);
        session.socketId = socket.id;
        session.save();

        socket.on("join", function () {
            console.log(socket.request.user.username + " joined server");
            io.emit("update", socket.request.user.username + " has joined the server.");
        });
        socket.on('chat message',function(msg){
            console.log('message: '+msg);
            var mensagem = {msg:msg , id:socket.request.user.username+ "(Agente)"};
            io.emit('chat message', mensagem);
        })
    }
    else{
    socket.on("join", function (name) {
        console.log(name+" joined server");
        people[socket.id] = name;
        io.emit("update", name + " has joined the server.");
    });
    socket.on('chat message', function (msg) {
            console.log('message: '+msg);
            var mensagem = {msg:msg, id:people[socket.id]};
            io.emit('chat message', mensagem);
    });
    }
});

exports.numAgente = function() {
    return numAgentes;
}
server.listen(port, function () {
        console.log(`application is running at: http://localhost:${port}`);
});