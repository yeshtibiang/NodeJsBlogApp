const express = require('express');

// express app 
// on cré une instance de express app
const app = express();

// listen for requests 
// cela renvoie un serveur qu'on peut utiliser pour des websockets
app.listen(3000);

app.get('/', (req, res) => {
    // on peut utiliser res.write et res.end 
    // mais maintenant un peut utiliser un troisième methode res.send 
    // l'avantage de cette méthode c'est qu'elle definit automatiquement le content-type header 
    // cela renvoie également un status code donc pas besoin de le definir
    //res.send('<p>Home Page</p>');
    // sendfile prend en deuxième argument le repertoire dans lequel le fichier est relatif
    res.sendFile('./client&servers/views/index.html', {root: __dirname});
})

app.get('/about', (req, res) => {
    //res.send('<p>About Page</p>');
    res.sendFile('./client&servers/views/about.html', {root: __dirname});
})

// redirects
// cela fait la redirection et renvoie un status code 301
app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

// 404 page
// il faut noter que use est utilisé plus pour les middlewares que pour les routes
// le use va etre appelé pour chaque adresse mais uniquement quand on atteind ce point du code.
// par contre express ne renvoie pas un code d'erreur
app.use((req, res) => {
    res.status(404).sendFile('./client&servers/views/404.html', {root: __dirname});
}) 