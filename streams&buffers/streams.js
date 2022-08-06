const fs = require('fs');

// lire les streams

// nous permet de dire où est ce que l'on va lire les datas
const readStream = fs.createReadStream('./blog3.txt', { encoding: 'utf8' })

const writeStream = fs.createWriteStream('./blog4.txt');
// ce .on est un event listener. 
// on ecoute un evenement qui se produit quand le stream est pret a lire les datas
// nous recuperons un chunk de datas
// on peut definir l'encodage dans la fonction createReadStream
// readStream.on('data', (chunk) => {
//     console.log('-----new chunk-----');
//     console.log(chunk)
//     // nous allons ecrire les chunk dans un nouveau fichier
//     writeStream.write('\nNew chunk')
//     writeStream.write(chunk);
// })

// piping
readStream.pipe(writeStream);