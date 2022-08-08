const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs.js');

// express app 
// on cré une instance de express app
const app = express();

// url pour se connecter à la base de données 
const DBURL = 'mongodb+srv://nodejsuser:dtybaba2015@node-yesh.590lq0u.mongodb.net/node-tuto?retryWrites=true&w=majority';
// se connecter à la base de données
// il faut note que ceci est une méthode assynchrone donc elle retourne un promise
mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000)
    })
    .catch((err) => console.log(err))

// on veut par ecouter les requete que si on est connecté à la base de données donc on va mettre le app.listen dans la fontion promisse 


//on veut dire qu'on veut utiliser ejs comme notre template engine
app.set('view engine', 'ejs');


// listen for requests 
// cela renvoie un serveur qu'on peut utiliser pour des websockets
// app.listen(3000);

// middleware & static files (css, js, images)
app.use(express.static('public'));
// donc maintenant si on met css dans public elle sera accessible dans notre site web. 

// middleware
// app.use((req, res, next) => {
//     console.log('request made')
//     console.log('host: ', req.hostname)
//     console.log('path: ', req.path)
//     console.log('method: ', req.method)
//     next();
// })
app.use(morgan('dev'))

// mongoose et mongo sandbox routes
app.get('/add-blog', (req, res) => {
    // creer un nouveau document dans la collection blogs
    const blog = new Blog({
        title: 'Test Blog2',
        snippet: 'This is a test blog2',
        body: 'This is the body of the test blog2'
    })

    // on sauvegarde le document dans la base de données
    // ceci est une tâche assynchrone donc retourne une promise
    blog.save()
        .then((result) => {
            // on renvoie le resulat
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

// on veut afficher tous les documents de la collection blogs
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) =>{
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

// un seul blog
// il faut noter que le id dans mongodb n'est pas un string mais mongoose nous assure la conversion en string. 
app.get('/single-blog', (req, res) => {
    Blog.findById('62f15dbf005b9f5ef7676608')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/', (req, res) => {
    // on peut utiliser res.write et res.end 
    // mais maintenant un peut utiliser un troisième methode res.send 
    // l'avantage de cette méthode c'est qu'elle definit automatiquement le content-type header 
    // cela renvoie également un status code donc pas besoin de le definir
    //res.send('<p>Home Page</p>');
    // sendfile prend en deuxième argument le repertoire dans lequel le fichier est relatif
    // on ne va pas send mais plus render 
    //res.sendFile('./client&servers/views/index.html', {root: __dirname});
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.'},
        {title: 'Link finds money', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.'},
    ];
    res.render('index', {title: 'Home', blogs});
})

app.get('/about', (req, res) => {
    //res.send('<p>About Page</p>');
    res.render('about', {title: 'About'});
    //res.sendFile('./client&servers/views/about.html', {root: __dirname});
})

// redirects
// cela fait la redirection et renvoie un status code 301
app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new blog'});
})

// 404 page
// il faut noter que use est utilisé plus pour les middlewares que pour les routes
// le use va etre appelé pour chaque adresse mais uniquement quand on atteind ce point du code.
// par contre express ne renvoie pas un code d'erreur
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
    //res.status(404).sendFile('./client&servers/views/404.html', {root: __dirname});
}) 