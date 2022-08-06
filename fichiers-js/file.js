// import le core module pour les fichiers 
const fs = require('fs');

// lire un fichier 
// le premier argument est un string est le chemin relatif du fichier à lire
// le second argument est une fonction qui sera appelée avec le contenu du fichier
// la fonction readFile est une fonc async donc on l'appelle avec un callback qui prend err, data
// fs.readFile('./docs/blog1.txt', (err, data) => {
     // on vefifie si il y a une erreur
//     if (err) {
         // si il y a une erreur on affiche le message d'erreur
//         console.log(err);
//     }
     // sinon on affiche le contenu du fichier
     // on transforme le contenu du fichier en string, le contenue etant un buffer 
//     console.log(data.toString());
// })

// ecrire un fichier
// on utilise fs.writeFile pour ecrire un fichier
// le premier argument est le chemin relatif du fichier à ecrire
// le second argument est le contenu du fichier
// le troisieme argument est le callback
// si le fichier n'existe pas il sera créé
// fs.writeFile('./docs/blog1.txt', 'Hello, world', () => {
//     console.log('File written');
// })

// directories
// si le dossier existe cela renvoyera une erreur 
// donc on va devoir tester si le dossier existe avant de l'ecrire, on utilise donc fs.existsSync 
if (!fs.existsSync('./assets')){
    fs.mkdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Directory created');
    })
}
else{
    //pour supprimer le repertoire si celui-ci existe 
    fs.rmdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Directory deleted');
    })
}

// suppresion d'un fichier
if (fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('File deleted');
    })
}