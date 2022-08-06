const http = require('http');
const fs = require('fs');




// créer le serveur, on stock le serveur dans la variable server
// prend comme un argument un callback function
// dans les paramètres de cette fonction on a le request et la reponse
const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    // set header content type
    // res.setHeader('Content-Type', 'text/plain');

    // renvoyer du html
    res.setHeader('Content-Type', 'text/html');

    // le repertoire ou sont les vues
    let path = './client&servers/views/'; 
    switch (req.url) {
        case '/':
            path += 'index.html';
            //mettre le status code
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            // on veut faire une redirection, on change le satus code
            res.statusCode = 301;
            // on fait la redirection en utilisant setHeader
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // on veut renvoyer un fichier html
    fs.readFile(path, (err, data) => {
        if (err){
            console.log(err);
            res.end()
        }
        else{
            // si on envoie une seule chose dans write on n'a pas besoin de la ligne write on peut mettre la data directement dans .end
            //res.write(data);
            // res.end()
            res.end(data)
        }
    })


    // res.write('<p>Hello World</p>');
    // res.write('<p>Hello Yeshua</p>');

    // send data back to the browser
    // res.write('Hello World');
    // fini la reponse et l'envoie au navigateur
    // on veut par contre renvoyer une page html. pour cela on va
    // va faire comme si dessus
    // res.end();
});

// on ecoute pas encore activement les requete pour cela on invoque la méthode listen
server.listen(3000, 'localhost', () => {
    console.log('server is running on port 3000')
})